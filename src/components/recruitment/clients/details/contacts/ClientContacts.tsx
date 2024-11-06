import { useState } from 'react';
import { Plus } from 'lucide-react';
import { ContactList } from './ContactList';
import { CreateContactModal } from './CreateContactModal';
import { ComposeEmailModal } from './ComposeEmailModal';
import { Contact } from '../../../../../types/contacts';
import { Client } from '../../../../../types/recruitment';

interface ClientContactsProps {
  client: Client;
  onUpdate: (updatedData: Partial<Client>) => void;
}

export function ClientContacts({ client, onUpdate }: ClientContactsProps) {
  const [showCreateContact, setShowCreateContact] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const handleEmailClick = (contact: Contact) => {
    setSelectedContact(contact);
    setShowEmailModal(true);
  };

  const handleAddContact = (contact: Contact) => {
    onUpdate({
      contacts: [...(client.contacts || []), contact]
    });
    setShowCreateContact(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Contacts</h2>
        <button
          onClick={() => setShowCreateContact(true)}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Contact
        </button>
      </div>

      <ContactList 
        contacts={client.contacts || []}
        onEmailClick={handleEmailClick}
        onUpdate={(contacts) => onUpdate({ contacts })}
      />

      <CreateContactModal
        isOpen={showCreateContact}
        onClose={() => setShowCreateContact(false)}
        onSubmit={handleAddContact}
      />

      <ComposeEmailModal
        isOpen={showEmailModal}
        onClose={() => {
          setShowEmailModal(false);
          setSelectedContact(null);
        }}
        contact={selectedContact}
      />
    </div>
  );
}