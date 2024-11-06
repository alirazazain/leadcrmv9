import { useState, useRef } from 'react';
import { MoreVertical, Pencil, UserCog, Trash2 } from 'lucide-react';
import { useClickOutside } from '../../../../hooks/useClickOutside';
import { EditClientPanel } from '../../EditClientPanel';
import { Client } from '../../../../store/recruitmentStore';

interface ClientActionsProps {
  client: Client;
  onUpdate: (updatedData: Partial<Client>) => void;
}

export function ClientActions({ client, onUpdate }: ClientActionsProps) {
  const [showActions, setShowActions] = useState(false);
  const [showEditPanel, setShowEditPanel] = useState(false);
  const actionsRef = useRef<HTMLDivElement>(null);

  useClickOutside(actionsRef, () => setShowActions(false));

  return (
    <>
      <div className="relative" ref={actionsRef}>
        <button
          onClick={() => setShowActions(!showActions)}
          className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
        >
          <MoreVertical className="h-5 w-5" />
        </button>

        {showActions && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
            <button
              onClick={() => {
                setShowEditPanel(true);
                setShowActions(false);
              }}
              className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
            >
              <Pencil className="h-4 w-4 mr-2" />
              Edit Client Details
            </button>
            <button
              onClick={() => {}}
              className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
            >
              <UserCog className="h-4 w-4 mr-2" />
              Edit Ownership
            </button>
            <button
              onClick={() => {}}
              className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Client
            </button>
          </div>
        )}
      </div>

      <EditClientPanel
        isOpen={showEditPanel}
        onClose={() => setShowEditPanel(false)}
        client={client}
        onUpdate={onUpdate}
      />
    </>
  );
}