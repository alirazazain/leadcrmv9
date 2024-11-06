import { useState } from 'react';
import { X, Search, Building2, Upload } from 'lucide-react';
import { mockCompanies } from '../../../data/mockCompanies';
import { useRecruitmentStore } from '../../../store/recruitmentStore';

interface ImportCompanyPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ImportCompanyPanel({ isOpen, onClose }: ImportCompanyPanelProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const { addClient } = useRecruitmentStore();

  const filteredCompanies = mockCompanies.filter(company =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.people.some(person => 
      person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (typeof person.email === 'string' ? person.email : person.email[0]).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handleImport = (company: any) => {
    addClient({
      name: company.name,
      industry: company.industry,
      location: company.location,
      website: company.website,
      linkedin: company.linkedin,
      jobCount: 0,
      owner: 'Unassigned'
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-end transition-opacity duration-300">
      <div className="w-full max-w-xl bg-white h-full shadow-2xl animate-slide-left">
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Import from Sales</h2>
              <p className="mt-1 text-sm text-gray-500">
                Select a company from your sales module to import as a client
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          {/* Search */}
          <div className="p-6 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search companies or contacts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Companies List */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-4">
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-2 border-indigo-500 border-t-transparent"></div>
                </div>
              ) : filteredCompanies.length > 0 ? (
                filteredCompanies.map((company) => (
                  <div
                    key={company.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-indigo-500 transition-colors duration-200"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Building2 className="h-5 w-5 text-gray-500" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">{company.name}</h3>
                        <p className="text-sm text-gray-500">{company.location}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleImport(company)}
                      className="flex items-center px-3 py-1.5 text-sm text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors duration-200"
                    >
                      <Upload className="h-4 w-4 mr-1.5" />
                      Import
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-sm text-gray-500">No companies found</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}