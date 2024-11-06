import { useState } from 'react';
import { UserPlus, X, Search } from 'lucide-react';
import { User } from '../../../../../types';

interface ClientManagersProps {
  clientId: string;
  managers: User[];
  onUpdate: (updatedData: Partial<any>) => void;
}

export function ClientManagers({ clientId, managers, onUpdate }: ClientManagersProps) {
  const [isSelectingManager, setIsSelectingManager] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock available users - replace with actual data
  const availableUsers: User[] = [
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'admin' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'manager' },
    // Add more users...
  ];

  const filteredUsers = availableUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddManager = (user: User) => {
    onUpdate({
      managers: [...managers, user]
    });
    setIsSelectingManager(false);
  };

  const handleRemoveManager = (userId: string) => {
    onUpdate({
      managers: managers.filter(m => m.id !== userId)
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-medium text-gray-900">Client Managers</h2>
        <button
          onClick={() => setIsSelectingManager(true)}
          className="p-1 text-gray-400 hover:text-indigo-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
        >
          <UserPlus className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-2">
        {managers.map((manager) => (
          <div
            key={manager.id}
            className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-sm font-medium text-gray-600">
                  {manager.name.charAt(0)}
                </span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{manager.name}</p>
                <p className="text-xs text-gray-500">{manager.email}</p>
              </div>
            </div>
            <button
              onClick={() => handleRemoveManager(manager.id)}
              className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Manager Selection Modal */}
      {isSelectingManager && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Add Client Manager</h3>
                <button
                  onClick={() => setIsSelectingManager(false)}
                  className="p-1 text-gray-400 hover:text-gray-600 rounded-lg"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="mt-4 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="max-h-96 overflow-y-auto p-4">
              <div className="space-y-2">
                {filteredUsers.map((user) => (
                  <button
                    key={user.id}
                    onClick={() => handleAddManager(user)}
                    className="w-full flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                  >
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-600">
                        {user.name.charAt(0)}
                      </span>
                    </div>
                    <div className="ml-3 text-left">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}