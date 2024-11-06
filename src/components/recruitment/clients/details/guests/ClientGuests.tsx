import { useState } from 'react';
import { Plus } from 'lucide-react';
import { GuestList } from './GuestList';
import { CreateGuestPanel } from './CreateGuestPanel';
import { Client } from '../../../../../types/recruitment';

interface ClientGuestsProps {
  client: Client;
  onUpdate: (updatedData: Partial<Client>) => void;
}

export function ClientGuests({ client, onUpdate }: ClientGuestsProps) {
  const [showCreateGuest, setShowCreateGuest] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Guests</h2>
        <button
          onClick={() => setShowCreateGuest(true)}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Guest
        </button>
      </div>

      <GuestList guests={client.guests || []} />

      <CreateGuestPanel
        isOpen={showCreateGuest}
        onClose={() => setShowCreateGuest(false)}
        client={client}
        onSubmit={(guest) => {
          onUpdate({
            guests: [...(client.guests || []), guest]
          });
          setShowCreateGuest(false);
        }}
      />
    </div>
  );
}