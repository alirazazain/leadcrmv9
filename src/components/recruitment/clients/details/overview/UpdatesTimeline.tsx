import { Mail, Calendar, UserPlus, Briefcase, MessageSquare, FileText, CheckCircle2, Phone } from 'lucide-react';
import { format } from 'date-fns';

interface Update {
  id: string;
  type: 'email' | 'meeting' | 'contact' | 'job' | 'note' | 'document' | 'status' | 'call';
  title: string;
  description: string;
  timestamp: string;
  user: {
    name: string;
    avatar?: string;
  };
}

interface UpdatesTimelineProps {
  clientId: string;
}

// Mock updates data - replace with actual data fetching
const mockUpdates: Update[] = [
  {
    id: '1',
    type: 'job',
    title: 'New Job Opening Created',
    description: 'Senior Frontend Developer position opened with React and TypeScript requirements',
    timestamp: '2024-03-12T14:30:00Z',
    user: { name: 'Sarah Wilson' }
  },
  {
    id: '2',
    type: 'meeting',
    title: 'Requirements Meeting Scheduled',
    description: 'Team sync to discuss technical requirements and hiring timeline',
    timestamp: '2024-03-12T13:15:00Z',
    user: { name: 'Mike Johnson' }
  },
  {
    id: '3',
    type: 'email',
    title: 'Job Description Review',
    description: 'Sent updated JD for Senior Frontend Developer role for approval',
    timestamp: '2024-03-12T11:45:00Z',
    user: { name: 'Emily Parker' }
  },
  {
    id: '4',
    type: 'contact',
    title: 'New Contact Added',
    description: 'Added David Chen (Tech Lead) as a new contact person',
    timestamp: '2024-03-12T10:30:00Z',
    user: { name: 'Sarah Wilson' }
  },
  {
    id: '5',
    type: 'call',
    title: 'Initial Discovery Call',
    description: 'Discussed hiring needs and team structure with HR Manager',
    timestamp: '2024-03-12T09:00:00Z',
    user: { name: 'John Smith' }
  },
  {
    id: '6',
    type: 'document',
    title: 'Contract Shared',
    description: 'Sent recruitment services agreement for review',
    timestamp: '2024-03-11T16:45:00Z',
    user: { name: 'Mike Johnson' }
  },
  {
    id: '7',
    type: 'status',
    title: 'Agreement Signed',
    description: 'Client signed and returned the recruitment services agreement',
    timestamp: '2024-03-11T15:20:00Z',
    user: { name: 'Sarah Wilson' }
  },
  {
    id: '8',
    type: 'note',
    title: 'Budget Discussion Notes',
    description: 'Documented approved budget range for all open positions',
    timestamp: '2024-03-11T14:00:00Z',
    user: { name: 'Emily Parker' }
  },
  {
    id: '9',
    type: 'meeting',
    title: 'Interview Process Meeting',
    description: 'Finalized interview stages and assessment criteria',
    timestamp: '2024-03-11T11:30:00Z',
    user: { name: 'John Smith' }
  },
  {
    id: '10',
    type: 'email',
    title: 'Welcome Email Sent',
    description: 'Sent welcome package and next steps to client team',
    timestamp: '2024-03-11T10:15:00Z',
    user: { name: 'Sarah Wilson' }
  },
  {
    id: '11',
    type: 'job',
    title: 'Job Requirements Updated',
    description: 'Added new skills requirements for the Frontend Developer role',
    timestamp: '2024-03-11T09:45:00Z',
    user: { name: 'Mike Johnson' }
  },
  {
    id: '12',
    type: 'contact',
    title: 'Contact Information Updated',
    description: 'Updated primary contact details for HR Manager',
    timestamp: '2024-03-10T16:30:00Z',
    user: { name: 'Emily Parker' }
  },
  {
    id: '13',
    type: 'note',
    title: 'Client Preferences',
    description: 'Added notes about preferred candidate background and culture fit',
    timestamp: '2024-03-10T15:00:00Z',
    user: { name: 'John Smith' }
  },
  {
    id: '14',
    type: 'status',
    title: 'Account Setup Complete',
    description: 'Finished client onboarding and system setup',
    timestamp: '2024-03-10T14:20:00Z',
    user: { name: 'Sarah Wilson' }
  },
  {
    id: '15',
    type: 'document',
    title: 'Company Profile Created',
    description: 'Created detailed company profile and hiring requirements document',
    timestamp: '2024-03-10T13:00:00Z',
    user: { name: 'Mike Johnson' }
  }
];

const getUpdateIcon = (type: Update['type']) => {
  switch (type) {
    case 'email':
      return <Mail className="h-5 w-5" />;
    case 'meeting':
      return <Calendar className="h-5 w-5" />;
    case 'contact':
      return <UserPlus className="h-5 w-5" />;
    case 'job':
      return <Briefcase className="h-5 w-5" />;
    case 'note':
      return <MessageSquare className="h-5 w-5" />;
    case 'document':
      return <FileText className="h-5 w-5" />;
    case 'status':
      return <CheckCircle2 className="h-5 w-5" />;
    case 'call':
      return <Phone className="h-5 w-5" />;
  }
};

const getUpdateColors = (type: Update['type']) => {
  switch (type) {
    case 'email':
      return 'bg-blue-100 text-blue-600';
    case 'meeting':
      return 'bg-purple-100 text-purple-600';
    case 'contact':
      return 'bg-green-100 text-green-600';
    case 'job':
      return 'bg-orange-100 text-orange-600';
    case 'note':
      return 'bg-gray-100 text-gray-600';
    case 'document':
      return 'bg-yellow-100 text-yellow-600';
    case 'status':
      return 'bg-emerald-100 text-emerald-600';
    case 'call':
      return 'bg-indigo-100 text-indigo-600';
  }
};

export function UpdatesTimeline({ clientId }: UpdatesTimelineProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Recent Updates</h2>
        <button className="text-sm text-indigo-600 hover:text-indigo-700">
          View All
        </button>
      </div>
      
      <div className="space-y-6">
        {mockUpdates.map((update) => (
          <div key={update.id} className="flex gap-4">
            <div className={`flex-shrink-0 w-10 h-10 rounded-full ${getUpdateColors(update.type)} flex items-center justify-center`}>
              {getUpdateIcon(update.type)}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{update.title}</h3>
                  <p className="mt-0.5 text-sm text-gray-500">{update.description}</p>
                </div>
                <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                  {format(new Date(update.timestamp), 'MMM d, h:mm a')}
                </span>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                by {update.user.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}