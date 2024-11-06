import { useState } from 'react';
import { ClientHeader } from '../../components/recruitment/clients/details/ClientHeader';
import { ClientTabs } from '../../components/recruitment/clients/details/ClientTabs';
import { ClientOverview } from '../../components/recruitment/clients/details/overview/ClientOverview';
import { ClientActivities } from '../../components/recruitment/clients/details/activities/ClientActivities';
import { ClientContacts } from '../../components/recruitment/clients/details/contacts/ClientContacts';
import { ClientGuests } from '../../components/recruitment/clients/details/guests/ClientGuests';
import { ClientNotes } from '../../components/recruitment/clients/details/notes/ClientNotes';
import { mockRecruitmentClients } from '../../data/mockRecruitmentClients';

export function ClientDetailsPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [client, setClient] = useState(mockRecruitmentClients[0]);

  const handleImageUpload = (file: File) => {
    // Handle image upload logic
    console.log('Uploading image:', file);
  };

  const handleUpdateClient = (updatedData: any) => {
    setClient(prev => ({ ...prev, ...updatedData }));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <ClientOverview client={client} onUpdate={handleUpdateClient} />;
      case 'activities':
        return <ClientActivities client={client} />;
      case 'contacts':
        return <ClientContacts client={client} onUpdate={handleUpdateClient} />;
      case 'guests':
        return <ClientGuests client={client} onUpdate={handleUpdateClient} />;
      case 'notes':
        return <ClientNotes client={client} onUpdate={handleUpdateClient} />;
      default:
        return (
          <div className="h-96 flex items-center justify-center text-gray-500">
            Content for {activeTab} tab will be implemented soon
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Client Header Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6">
          <ClientHeader
            client={client}
            onImageUpload={handleImageUpload}
            onUpdate={handleUpdateClient}
          />
        </div>

        {/* Tabs Navigation */}
        <div className="border-t border-gray-200">
          <ClientTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>
      </div>

      {/* Tab Content Area */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        {renderTabContent()}
      </div>
    </div>
  );
}