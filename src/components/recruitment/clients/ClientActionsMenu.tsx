import { useState, useRef } from 'react';
import { ChevronDown, FileUp, Plus } from 'lucide-react';
import { useClickOutside } from '../../../hooks/useClickOutside';
import { ImportCompanyPanel } from './ImportCompanyPanel';
import { CreateClientPanel } from './CreateClientPanel';

export function ClientActionsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [showImportPanel, setShowImportPanel] = useState(false);
  const [showCreatePanel, setShowCreatePanel] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useClickOutside(menuRef, () => setIsOpen(false));

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Client
        <ChevronDown className={`ml-2 h-4 w-4 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
          <div className="py-1">
            <button
              onClick={() => {
                setShowImportPanel(true);
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
            >
              <FileUp className="mr-2 h-4 w-4" />
              Import from Sales
            </button>
            <button
              onClick={() => {
                setShowCreatePanel(true);
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
            >
              <Plus className="mr-2 h-4 w-4" />
              Create from Scratch
            </button>
          </div>
        </div>
      )}

      <ImportCompanyPanel
        isOpen={showImportPanel}
        onClose={() => setShowImportPanel(false)}
      />

      <CreateClientPanel
        isOpen={showCreatePanel}
        onClose={() => setShowCreatePanel(false)}
      />
    </div>
  );
}