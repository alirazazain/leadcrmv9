import { Guest } from '../../../../../types/guests';

interface GuestListProps {
  guests: Guest[];
}

export function GuestList({ guests }: GuestListProps) {
  if (guests.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <p className="text-sm text-gray-500">You have not created any guests yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {guests.map((guest) => (
        <div
          key={guest.id}
          className="bg-white border border-gray-200 rounded-lg shadow-sm hover:border-gray-300 transition-colors duration-200"
        >
          <div className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{guest.name}</h3>
                <p className="text-sm text-gray-500">{guest.email}</p>
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                guest.status === 'ACTIVE' 
                  ? 'bg-green-100 text-green-800'
                  : guest.status === 'PENDING'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {guest.status}
              </span>
            </div>

            <div className="mt-4 space-y-2">
              <div>
                <h4 className="text-sm font-medium text-gray-700">Access Level</h4>
                <ul className="mt-1 space-y-1">
                  {guest.access.jobs && (
                    <li className="text-sm text-gray-600">
                      Jobs: {guest.access.jobs === 'ALL' ? 'All Jobs' : 'Specific Jobs'}
                    </li>
                  )}
                  {guest.access.invoices && (
                    <li className="text-sm text-gray-600">Invoices</li>
                  )}
                </ul>
              </div>

              {guest.description && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Description</h4>
                  <p className="text-sm text-gray-600">{guest.description}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}