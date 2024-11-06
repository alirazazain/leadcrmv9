import { Plus } from 'lucide-react';
import { ActivityList } from './ActivityList';
import { mockFutureActivities } from '../../../../../data/mockActivities';

interface FutureActivitiesProps {
  onScheduleActivity: () => void;
}

export function FutureActivities({ onScheduleActivity }: FutureActivitiesProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Future Activities</h2>
        <button
          onClick={onScheduleActivity}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
        >
          <Plus className="h-4 w-4 mr-2" />
          Schedule Activity
        </button>
      </div>

      {mockFutureActivities.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <p className="text-sm text-gray-500">You have not scheduled any activities yet.</p>
        </div>
      ) : (
        <ActivityList activities={mockFutureActivities} />
      )}
    </div>
  );
}