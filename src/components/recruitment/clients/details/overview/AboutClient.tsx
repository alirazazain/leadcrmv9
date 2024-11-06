import { Building2, Users } from 'lucide-react';
import { Client } from '../../../../../store/recruitmentStore';

interface AboutClientProps {
  client: Client;
}

export function AboutClient({ client }: AboutClientProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <h2 className="text-sm font-medium text-gray-900 mb-4">About Client</h2>
      
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <Building2 className="h-5 w-5 text-gray-400 mt-0.5" />
          <div>
            <h3 className="text-sm font-medium text-gray-700">Company Size</h3>
            <p className="text-sm text-gray-600">{client.size || 'Not specified'}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Users className="h-5 w-5 text-gray-400 mt-0.5" />
          <div>
            <h3 className="text-sm font-medium text-gray-700">Industry</h3>
            <p className="text-sm text-gray-600">{client.industry || 'Not specified'}</p>
          </div>
        </div>

        {client.description && (
          <div className="pt-4 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Description</h3>
            <p className="text-sm text-gray-600">{client.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}