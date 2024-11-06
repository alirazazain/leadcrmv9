import { useState } from 'react';
import { Mail, Pencil, Trash2, Linkedin, Phone } from 'lucide-react';
import { Contact } from '../../../../../types/contacts';
import { mockContacts } from '../../../../../data/mockContacts';
import { EditContactModal } from './EditContactModal';
import { DeleteConfirmationDialog } from '../../../../common/DeleteConfirmationDialog';

interface ContactListProps {
  onEmailClick: (contact: Contact) => void;
}

export function ContactList({ onEmailClick }: ContactListProps) {
  const [contacts, setContacts] = useState(mockContacts);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [deleteContact, setDeleteContact] = useState<Contact | null>(null);

  const handleDelete = () => {
    if (deleteContact) {
      setContacts(contacts.filter(c => c.id !== deleteContact.id));
      setDeleteContact(null);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {contacts.map((contact) => (
        <div
          key={contact.id}
          className="bg-white border border-gray-200 rounded-lg shadow-sm hover:border-gray-300 transition-colors duration-200"
        >
          <div className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{contact.name}</h3>
                <p className="text-sm text-gray-500">{contact.designation}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onEmailClick(contact)}
                  className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                  title="Send email"
                >
                  <Mail className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setEditingContact(contact)}
                  className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors duration-200"
                  title="Edit contact"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setDeleteContact(contact)}
                  className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                  title="Delete contact"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              {contact.email && (
                <div className="flex items-center text-sm">
                  <Mail className="h-4 w-4 text-gray-400 mr-2" />
                  <a href={`mailto:${contact.email}`} className="text-gray-600 hover:text-indigo-600">
                    {contact.email}
                  </a>
                </div>
              )}
              
              {contact.phone && (
                <div className="flex items-center text-sm">
                  <Phone className="h-4 w-4 text-gray-400 mr-2" />
                  <a href={`tel:${contact.phone}`} className="text-gray-600 hover:text-indigo-600">
                    {contact.phone}
                  </a>
                </div>
              )}

              {contact.linkedin && (
                <div className="flex items-center text-sm">
                  <Linkedin className="h-4 w-4 text-gray-400 mr-2" />
                  <a
                    href={contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-indigo-600"
                  >
                    LinkedIn Profile
                  </a>
                </div>
              )}
            </div>

            {contact.notes && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500">{contact.notes}</p>
              </div>
            )}
          </div>
        </div>
      ))}

      <EditContactModal
        isOpen={!!editingContact}
        onClose={() => setEditingContact(null)}
        contact={editingContact}
        onSave={(updatedContact) => {
          setContacts(contacts.map(c => 
            c.id === updatedContact.id ? updatedContact : c
          ));
          setEditingContact(null);
        }}
      />

      <DeleteConfirmationDialog
        isOpen={!!deleteContact}
        onClose={() => setDeleteContact(null)}
        onConfirm={handleDelete}
        title="Delete Contact"
        message="Are you sure you want to delete this contact? This action cannot be undone."
      />
    </div>
  );
}