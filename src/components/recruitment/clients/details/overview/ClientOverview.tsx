import { UpdatesTimeline } from './UpdatesTimeline';
import { ClientManagers } from './ClientManagers';
import { AboutClient } from './AboutClient';
import { RecentNotes } from './RecentNotes';
import { Client } from '../../../../../store/recruitmentStore';

interface ClientOverviewProps {
  client: Client;
  onUpdate: (updatedData: Partial<Client>) => void;
}

export function ClientOverview({ client, onUpdate }: ClientOverviewProps) {
  return (
    <div className="grid grid-cols-3 gap-6">
      {/* Left Section - Updates Timeline */}
      <div className="col-span-2">
        <UpdatesTimeline clientId={client.id} />
      </div>

      {/* Right Section - Info Cards */}
      <div className="space-y-6">
        <ClientManagers 
          clientId={client.id}
          managers={client.managers || []}
          onUpdate={onUpdate}
        />
        
        <AboutClient client={client} />
        
        <RecentNotes clientId={client.id} />
      </div>
    </div>
  );
}