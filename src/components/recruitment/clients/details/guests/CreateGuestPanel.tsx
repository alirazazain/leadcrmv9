import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { Client } from '../../../../../types/recruitment';
import { Guest, GuestAccess } from '../../../../../types/guests';

interface CreateGuestPanelProps {
  isOpen: boolean;
  onClose: () => void;
  client: Client;
  onSubmit: (guest: Guest) => void;
}

type GuestSource = 'CONTACT' | 'NON_CONTACT';
type JobAccess = 'ALL' | 'SPECIFIC';

export function CreateGuestPanel({ isOpen, onClose, client, onSubmit }: CreateGuestPanelProps) {
  const [guestSource, setGuestSource] = useState<GuestSource>('CONTACT');
  const [selectedContact, setSelectedContact] = useState('');
  const [jobAccess, setJobAccess] = useState<JobAccess>('ALL');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    description: '',
    selectedJobs: [] as string[],
    hasInvoiceAccess: false
  });

  const modalRef = useRef<HTMLDivElement>(null);
  const initialFocusRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
      initialFocusRef.current?.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (guestSource === 'CONTACT' && selectedContact) {
      const contact = client.contacts?.find(c => c.id === selectedContact);
      if (contact) {
        setFormData(prev => ({
          ...prev,
          name: contact.name,
          email: contact.email
        }));
      }
    }
  }, [guestSource, selectedContact, client.contacts]);

  const handleSubmit = () => {
    const access: GuestAccess = {
      jobs: jobAccess === 'ALL' ? 'ALL' : formData.selectedJobs,
      invoices: formData.hasInvoiceAccess
    };

    const guest: Guest = {
      id: crypto.randomUUID(),
      name: formData.name,
      email: formData.email,
      description: formData.description,
      access,
      status: 'PENDING',
      createdAt: new Date().toISOString()
    };

    onSubmit(guest);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto"
      onClick={handleOverlayClick}
    >
      <div className="min-h-screen px-4 text-center">
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" />

        <span className="inline-block h-screen align-middle">&#8203;</span>

        <div
          ref={modalRef}
          className="inline-block w-full max-w-2xl my-8 text-left align-middle transition-all transform bg-white shadow-xl rounded-lg"
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Create Guest</h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors duration-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="px-6 py-4 max-h-[calc(100vh-200px)] overflow-y-auto">
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Guest Source
                </label>
                <div className="mt-2 space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      value="CONTACT"
                      checked={guestSource === 'CONTACT'}
                      onChange={(e) => setGuestSource(e.target.value as GuestSource)}
                      className="form-radio text-indigo-600"
                    />
                    <span className="ml-2">Choose from Contacts</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      value="NON_CONTACT"
                      checked={guestSource === 'NON_CONTACT'}
                      onChange={(e) => setGuestSource(e.target.value as GuestSource)}
                      className="form-radio text-indigo-600"
                    />
                    <span className="ml-2">Create from Non-Contacts</span>
                  </label>
                </div>
              </div>

              {guestSource === 'CONTACT' && (
                <div>
                  <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
                    Select Contact
                  </label>
                  <select
                    id="contact"
                    value={selectedContact}
                    onChange={(e) => setSelectedContact(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Select a contact</option>
                    {client.contacts?.map(contact => (
                      <option key={contact.id} value={contact.id}>
                        {contact.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Guest Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Access Level
                </label>
                <div className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={jobAccess !== null}
                        onChange={(e) => setJobAccess(e.target.checked ? 'ALL' : null)}
                        className="form-checkbox text-indigo-600"
                      />
                      <span className="ml-2">Jobs</span>
                    </label>

                    {jobAccess && (
                      <div className="ml-6 space-y-2">
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            value="ALL"
                            checked={jobAccess === 'ALL'}
                            onChange={(e) => setJobAccess(e.target.value as JobAccess)}
                            className="form-radio text-indigo-600"
                          />
                          <span className="ml-2">All Jobs</span>
                        </label>
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            value="SPECIFIC"
                            checked={jobAccess === 'SPECIFIC'}
                            onChange={(e) => setJobAccess(e.target.value as JobAccess)}
                            className="form-radio text-indigo-600"
                          />
                          <span className="ml-2">Specific Jobs</span>
                        </label>

                        {jobAccess === 'SPECIFIC' && (
                          <div className="ml-6">
                            <select
                              multiple
                              value={formData.selectedJobs}
                              onChange={(e) => {
                                const options = Array.from(e.target.selectedOptions, option => option.value);
                                setFormData(prev => ({ ...prev, selectedJobs: options }));
                              }}
                              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            >
                              {/* Add job options here */}
                            </select>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.hasInvoiceAccess}
                        onChange={(e) => setFormData(prev => ({ ...prev, hasInvoiceAccess: e.target.checked }))}
                        className="form-checkbox text-indigo-600"
                      />
                      <span className="ml-2">Invoices</span>
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </form>
          </div>

          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-lg hover:bg-indigo-700"
            >
              Create Guest
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}