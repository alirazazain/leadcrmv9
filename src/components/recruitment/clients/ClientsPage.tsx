import { useState } from 'react';
import { Plus, Filter, ChevronLeft, ChevronRight, Trash2, PenSquare, Building2, Upload } from 'lucide-react';
import { useRecruitmentStore } from '../../../store/recruitmentStore';
import { ClientFilters } from './ClientFilters';
import { SearchBar } from './SearchBar';
import { BulkActionsMenu } from './BulkActionsMenu';
import { DeleteConfirmationDialog } from '../../common/DeleteConfirmationDialog';
import { SelectAllDialog } from '../../common/SelectAllDialog';
import { ImportCompanyPanel } from './ImportCompanyPanel';
import { CreateClientPanel } from './CreateClientPanel';

export function ClientsPage() {
  const { clients, deleteClient } = useRecruitmentStore();
  const [deleteClientId, setDeleteClientId] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedClients, setSelectedClients] = useState<Set<string>>(new Set());
  const [selectAllDialogOpen, setSelectAllDialogOpen] = useState(false);
  const [showBulkDeleteDialog, setShowBulkDeleteDialog] = useState(false);
  const [showImportPanel, setShowImportPanel] = useState(false);
  const [showCreatePanel, setShowCreatePanel] = useState(false);
  const [showAddOptions, setShowAddOptions] = useState(false);

  const handleDeleteClick = (e: React.MouseEvent, clientId: string) => {
    e.stopPropagation();
    setDeleteClientId(clientId);
  };

  const handleDeleteConfirm = () => {
    if (deleteClientId) {
      deleteClient(deleteClientId);
      setDeleteClientId(null);
    }
  };

  const handleFiltersChange = (filters: any) => {
    // Apply filters to clients
    console.log('Filters changed:', filters);
  };

  const handleCheckboxClick = (e: React.MouseEvent, clientId: string) => {
    e.stopPropagation();
    const newSelected = new Set(selectedClients);
    if (newSelected.has(clientId)) {
      newSelected.delete(clientId);
    } else {
      newSelected.add(clientId);
    }
    setSelectedClients(newSelected);
  };

  const handleSelectAllClick = () => {
    if (selectedClients.size === clients.length) {
      setSelectedClients(new Set());
    } else {
      setSelectAllDialogOpen(true);
    }
  };

  const handleSelectPage = () => {
    const newSelected = new Set(clients.map(client => client.id));
    setSelectedClients(newSelected);
    setSelectAllDialogOpen(false);
  };

  const handleSelectAll = () => {
    const newSelected = new Set(clients.map(client => client.id));
    setSelectedClients(newSelected);
    setSelectAllDialogOpen(false);
  };

  const handleBulkExport = () => {
    console.log('Exporting clients:', Array.from(selectedClients));
  };

  const handleBulkDelete = () => {
    setShowBulkDeleteDialog(true);
  };

  const handleBulkDeleteConfirm = () => {
    selectedClients.forEach(id => deleteClient(id));
    setSelectedClients(new Set());
    setShowBulkDeleteDialog(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Clients</h1>
              <p className="mt-1 text-sm text-gray-500">Manage your recruitment clients</p>
            </div>
            <div className="relative">
              <button
                onClick={() => setShowAddOptions(!showAddOptions)}
                onBlur={() => setTimeout(() => setShowAddOptions(false), 200)}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Client
              </button>
              {showAddOptions && (
                <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setShowImportPanel(true);
                        setShowAddOptions(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Import from Sales
                    </button>
                    <button
                      onClick={() => {
                        setShowCreatePanel(true);
                        setShowAddOptions(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <Building2 className="h-4 w-4 mr-2" />
                      Create from Scratch
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <SearchBar onClientSelect={() => {}} />
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 ${
                  showFilters ? 'bg-gray-100' : 'bg-white'
                } hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </button>
              <BulkActionsMenu
                selectedCount={selectedClients.size}
                onExport={handleBulkExport}
                onDelete={handleBulkDelete}
              />
            </div>
          </div>

          {showFilters && (
            <div className="mt-6">
              <ClientFilters onFiltersChange={handleFiltersChange} />
            </div>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-8">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    checked={selectedClients.size > 0 && selectedClients.size === clients.length}
                    onChange={handleSelectAllClick}
                  />
                </th>
                {['Client Title', 'Industry', 'Location', 'Job Count', 'Client Owner', 'Actions'].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {clients.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-sm text-gray-500">
                    No clients yet
                  </td>
                </tr>
              ) : (
                clients.map((client) => (
                  <tr
                    key={client.id}
                    className="hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap w-8" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        checked={selectedClients.has(client.id)}
                        onChange={(e) => handleCheckboxClick(e as any, client.id)}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{client.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{client.industry || '-'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{client.location}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{client.jobCount}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{client.owner}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <button
                          className="p-1 text-gray-500 hover:text-indigo-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                        >
                          <PenSquare className="h-4 w-4" />
                        </button>
                        <button
                          onClick={(e) => handleDeleteClick(e, client.id)}
                          className="p-1 text-gray-500 hover:text-red-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Previous
            </button>
            <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">{clients.length}</span> of{' '}
                <span className="font-medium">{clients.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <ChevronRight className="h-5 w-5" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <DeleteConfirmationDialog
        isOpen={!!deleteClientId}
        onClose={() => setDeleteClientId(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Client"
        message="Are you sure you want to delete this client? This action cannot be undone."
      />

      <DeleteConfirmationDialog
        isOpen={showBulkDeleteDialog}
        onClose={() => setShowBulkDeleteDialog(false)}
        onConfirm={handleBulkDeleteConfirm}
        title="Delete Selected Clients"
        message={`Are you sure you want to delete ${selectedClients.size} selected clients? This action cannot be undone.`}
      />

      <SelectAllDialog
        isOpen={selectAllDialogOpen}
        onClose={() => setSelectAllDialogOpen(false)}
        onSelectPage={handleSelectPage}
        onSelectAll={handleSelectAll}
        currentPageCount={clients.length}
        totalCount={clients.length}
      />

      <ImportCompanyPanel
        isOpen={showImportPanel}
        onClose={() => setShowImportPanel(false)}
      />

      <CreateClientPanel
        isOpen={showCreatePanel}
        onClose={() => setShowCreatePanel(false)}
      />
    </div>
  );
}