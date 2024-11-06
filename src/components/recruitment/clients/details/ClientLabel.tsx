import { useState, useRef } from 'react';
import { Plus } from 'lucide-react';
import { useClickOutside } from '../../../../hooks/useClickOutside';
import { Client } from '../../../../store/recruitmentStore';

interface ClientLabelProps {
  client: Client;
  onUpdate: (updatedData: Partial<Client>) => void;
}

const CLIENT_LABELS = [
  { id: 'high-priority', name: 'High Priority', color: 'bg-red-600' },
  { id: 'startup', name: 'Startup', color: 'bg-blue-600' },
  { id: 'high-paying', name: 'High Paying', color: 'bg-green-600' }
];

export function ClientLabel({ client, onUpdate }: ClientLabelProps) {
  const [showLabelDropdown, setShowLabelDropdown] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const [newLabel, setNewLabel] = useState('');
  const [showNewLabelInput, setShowNewLabelInput] = useState(false);
  const labelRef = useRef<HTMLDivElement>(null);

  useClickOutside(labelRef, () => setShowLabelDropdown(false));

  const handleAddNewLabel = () => {
    if (newLabel.trim()) {
      CLIENT_LABELS.push({
        id: newLabel.toLowerCase().replace(/\s+/g, '-'),
        name: newLabel,
        color: 'bg-gray-600' // Default color
      });
      setNewLabel('');
      setShowNewLabelInput(false);
    }
  };

  return (
    <div className="relative" ref={labelRef}>
      <button
        onClick={() => setShowLabelDropdown(!showLabelDropdown)}
        className={`px-3 py-1 text-sm font-medium text-white rounded-lg ${
          selectedLabel 
            ? CLIENT_LABELS.find(l => l.id === selectedLabel)?.color 
            : 'bg-indigo-600'
        }`}
      >
        {selectedLabel 
          ? CLIENT_LABELS.find(l => l.id === selectedLabel)?.name 
          : 'Client Label'}
      </button>

      {showLabelDropdown && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
          {CLIENT_LABELS.map(label => (
            <button
              key={label.id}
              onClick={() => {
                setSelectedLabel(label.id);
                setShowLabelDropdown(false);
                onUpdate({ label: label.id });
              }}
              className="w-full px-4 py-2 text-sm text-left hover:bg-gray-100 flex items-center"
            >
              <span className={`w-3 h-3 rounded-full ${label.color} mr-2`}></span>
              {label.name}
            </button>
          ))}
          {showNewLabelInput ? (
            <div className="px-4 py-2 space-y-2">
              <input
                type="text"
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                placeholder="Enter label name"
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                autoFocus
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowNewLabelInput(false)}
                  className="px-2 py-1 text-xs text-gray-600 hover:bg-gray-100 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddNewLabel}
                  className="px-2 py-1 text-xs text-white bg-indigo-600 rounded hover:bg-indigo-700"
                >
                  Add
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowNewLabelInput(true)}
              className="w-full px-4 py-2 text-sm text-left text-indigo-600 hover:bg-gray-100 flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create New Label
            </button>
          )}
        </div>
      )}
    </div>
  );
}