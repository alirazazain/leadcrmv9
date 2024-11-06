import { format } from 'date-fns';

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  createdBy: {
    name: string;
    avatar?: string;
  };
}

interface RecentNotesProps {
  clientId: string;
}

// Mock notes data - replace with actual data fetching
const mockNotes: Note[] = [
  {
    id: '1',
    title: 'Initial Meeting Notes',
    content: 'Discussed requirements for senior developer positions. Client is looking to expand their tech team.',
    createdAt: '2024-03-12T10:00:00Z',
    createdBy: { name: 'John Doe' }
  },
  {
    id: '2',
    title: 'Follow-up Call',
    content: 'Confirmed budget and timeline for the recruitment process.',
    createdAt: '2024-03-11T15:30:00Z',
    createdBy: { name: 'Sarah Wilson' }
  },
  {
    id: '3',
    title: 'Team Structure Update',
    content: 'Client provided updated team structure and reporting lines.',
    createdAt: '2024-03-10T09:15:00Z',
    createdBy: { name: 'Mike Johnson' }
  }
];

export function RecentNotes({ clientId }: RecentNotesProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-medium text-gray-900">Recent Notes</h2>
        <button className="text-sm text-indigo-600 hover:text-indigo-700">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {mockNotes.map((note) => (
          <div
            key={note.id}
            className="p-3 bg-gray-50 rounded-lg space-y-2"
          >
            <div className="flex items-start justify-between">
              <h3 className="text-sm font-medium text-gray-900">{note.title}</h3>
              <span className="text-xs text-gray-500">
                {format(new Date(note.createdAt), 'MMM d')}
              </span>
            </div>
            <p className="text-sm text-gray-600 line-clamp-2">{note.content}</p>
            <p className="text-xs text-gray-500">
              by {note.createdBy.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}