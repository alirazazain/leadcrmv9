import { useState } from 'react';
import { ChevronDown, Video, Mail, Phone, Calendar, CheckSquare } from 'lucide-react';
import { format } from 'date-fns';
import { Activity, ActivityType } from '../../../../../types/activities';

interface ActivityListProps {
  activities: Activity[];
}

const getActivityIcon = (type: ActivityType) => {
  switch (type) {
    case 'MEETING':
      return <Video className="h-5 w-5" />;
    case 'EMAIL':
      return <Mail className="h-5 w-5" />;
    case 'PHONE_CALL':
      return <Phone className="h-5 w-5" />;
    case 'INTERVIEW':
      return <Calendar className="h-5 w-5" />;
    case 'TASK':
      return <CheckSquare className="h-5 w-5" />;
    default:
      return null;
  }
};

const getActivityColor = (type: ActivityType) => {
  switch (type) {
    case 'MEETING':
      return 'bg-purple-100 text-purple-600';
    case 'EMAIL':
      return 'bg-blue-100 text-blue-600';
    case 'PHONE_CALL':
      return 'bg-green-100 text-green-600';
    case 'INTERVIEW':
      return 'bg-yellow-100 text-yellow-600';
    case 'TASK':
      return 'bg-indigo-100 text-indigo-600';
    default:
      return 'bg-gray-100 text-gray-600';
  }
};

export function ActivityList({ activities }: ActivityListProps) {
  const [expandedActivity, setExpandedActivity] = useState<string | null>(null);

  const toggleActivity = (activityId: string) => {
    setExpandedActivity(expandedActivity === activityId ? null : activityId);
  };

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div 
          key={activity.id} 
          className="bg-white border border-gray-200 rounded-lg shadow-sm hover:border-gray-300 transition-colors duration-200"
        >
          <button
            onClick={() => toggleActivity(activity.id)}
            className="w-full flex items-center justify-between p-4"
          >
            <div className="flex items-center space-x-4">
              <div className={`p-2 rounded-lg ${getActivityColor(activity.type)}`}>
                {getActivityIcon(activity.type)}
              </div>
              <div className="text-left">
                <h3 className="text-sm font-medium text-gray-900">{activity.title}</h3>
                <p className="text-sm text-gray-500">
                  {format(new Date(activity.time), 'MMM d, yyyy h:mm a')}
                </p>
              </div>
            </div>
            <ChevronDown
              className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
                expandedActivity === activity.id ? 'transform rotate-180' : ''
              }`}
            />
          </button>

          {expandedActivity === activity.id && (
            <div className="px-4 pb-4">
              <div className="pt-4 border-t border-gray-200">
                <dl className="grid grid-cols-2 gap-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Assignee</dt>
                    <dd className="mt-1 text-sm text-gray-900">{activity.assignee.name}</dd>
                  </div>
                  {activity.attendees && activity.attendees.length > 0 && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Attendees</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {activity.attendees.map(a => a.name).join(', ')}
                      </dd>
                    </div>
                  )}
                  {activity.location && (
                    <div className="col-span-2">
                      <dt className="text-sm font-medium text-gray-500">Location</dt>
                      <dd className="mt-1 text-sm text-gray-900">{activity.location}</dd>
                    </div>
                  )}
                  {activity.description && (
                    <div className="col-span-2">
                      <dt className="text-sm font-medium text-gray-500">Description</dt>
                      <dd className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">
                        {activity.description}
                      </dd>
                    </div>
                  )}
                  {activity.attachments && activity.attachments.length > 0 && (
                    <div className="col-span-2">
                      <dt className="text-sm font-medium text-gray-500">Attachments</dt>
                      <dd className="mt-2 space-y-2">
                        {activity.attachments.map((attachment, index) => (
                          <a
                            key={index}
                            href={attachment.url}
                            className="flex items-center p-2 text-sm text-indigo-600 hover:text-indigo-500 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors duration-200"
                          >
                            {attachment.name}
                          </a>
                        ))}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}