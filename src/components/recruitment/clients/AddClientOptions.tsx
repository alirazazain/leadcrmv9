import { useState } from 'react';
import { Plus, Upload, FilePlus2 } from 'lucide-react';
import { ImportCompanyPanel } from './ImportCompanyPanel';
import { CreateClientPanel } from './CreateClientPanel';

export function AddClientOptions() {
  const [showOptions, setShowOptions] = useState(false);
  const [showImportPanel, setShowImportPanel] = useState(false);
  const [showCreatePanel, setShowCreatePanel] = useState(false);

  return (
    <>
      <div className="relative">
        <button
          onClick={() => setShowOptions(!showOptions)}
          onBlur={() => setTimeout(() => setShowOptions(false), 200)}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Client
        </button>

        {showOptions && (
          <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
            <div className="py-1">
              <button
                onClick={() => {
                  setShowImportPanel(true);
                  setShowOptions(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
              >
                <Upload className="h-4 w-4 mr-2" />
                Import from Sales
              </button>
              <button
                onClick={() => {
                  setShowCreatePanel(true);
                  setShowOptions(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
              >
                <FilePlus2 className="h-4 w-4 mr-2" />
                Create from Scratch
              </button>
            </div>
          </div>
        )}
      </div>

      <ImportCompanyPanel
        isOpen={showImportPanel}
        onClose={() => setShowImportPanel(false)}
      />

      <CreateClientPanel
        isOpen={showCreatePanel}
        onClose={() => setShowCreatePanel(false)}
      />
    </>
  );
}