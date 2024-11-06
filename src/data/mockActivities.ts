import { Activity } from '../types/activities';
import { addDays, subDays, addHours, subHours } from 'date-fns';

const now = new Date();

export const mockPastActivities: Activity[] = [
  {
    id: '1',
    title: 'Initial Client Meeting',
    type: 'MEETING',
    time: subDays(now, 2).toISOString(),
    assignee: { id: '1', name: 'John Doe', email: 'john@example.com' },
    attendees: [
      { id: '2', name: 'Sarah Wilson', email: 'sarah@example.com' },
      { id: '3', name: 'Mike Johnson', email: 'mike@example.com' }
    ],
    location: 'Zoom Meeting',
    description: 'Discussed project requirements and team structure. Client is looking to hire 5 developers in the next quarter.'
  },
  {
    id: '2',
    title: 'Follow-up Call',
    type: 'PHONE_CALL',
    time: subDays(now, 1).toISOString(),
    assignee: { id: '1', name: 'John Doe', email: 'john@example.com' },
    description: 'Clarified budget constraints and timeline expectations.'
  },
  {
    id: '3',
    title: 'Technical Assessment Review',
    type: 'TASK',
    time: subHours(now, 5).toISOString(),
    assignee: { id: '2', name: 'Sarah Wilson', email: 'sarah@example.com' },
    description: 'Reviewed and updated technical assessment criteria for frontend developers.'
  },
  {
    id: '4',
    title: 'Contract Draft Sent',
    type: 'EMAIL',
    time: subHours(now, 3).toISOString(),
    assignee: { id: '1', name: 'John Doe', email: 'john@example.com' },
    description: 'Sent the initial contract draft for review.',
    attachments: [
      { name: 'Contract_Draft_v1.pdf', url: '#' }
    ]
  },
  {
    id: '5',
    title: 'Candidate Interview',
    type: 'INTERVIEW',
    time: subHours(now, 1).toISOString(),
    assignee: { id: '3', name: 'Mike Johnson', email: 'mike@example.com' },
    attendees: [
      { id: '4', name: 'Emily Brown', email: 'emily@example.com' }
    ],
    location: 'Microsoft Teams',
    description: 'Technical interview with senior frontend developer candidate.'
  }
];

export const mockFutureActivities: Activity[] = [
  {
    id: '6',
    title: 'Team Sync Meeting',
    type: 'MEETING',
    time: addHours(now, 2).toISOString(),
    assignee: { id: '1', name: 'John Doe', email: 'john@example.com' },
    attendees: [
      { id: '2', name: 'Sarah Wilson', email: 'sarah@example.com' },
      { id: '3', name: 'Mike Johnson', email: 'mike@example.com' }
    ],
    location: 'Zoom Meeting',
    description: 'Weekly sync to discuss recruitment progress and challenges.'
  },
  {
    id: '7',
    title: 'Candidate Screening',
    type: 'PHONE_CALL',
    time: addHours(now, 4).toISOString(),
    assignee: { id: '2', name: 'Sarah Wilson', email: 'sarah@example.com' },
    description: 'Initial screening call with backend developer candidate.'
  },
  {
    id: '8',
    title: 'Contract Review Meeting',
    type: 'MEETING',
    time: addDays(now, 1).toISOString(),
    assignee: { id: '1', name: 'John Doe', email: 'john@example.com' },
    attendees: [
      { id: '5', name: 'Legal Team', email: 'legal@example.com' }
    ],
    location: 'Microsoft Teams',
    description: 'Review and finalize contract terms with legal team.'
  },
  {
    id: '9',
    title: 'Technical Assessment',
    type: 'TASK',
    time: addDays(now, 2).toISOString(),
    assignee: { id: '3', name: 'Mike Johnson', email: 'mike@example.com' },
    description: 'Prepare technical assessment tasks for upcoming interviews.',
    attachments: [
      { name: 'Assessment_Template.docx', url: '#' }
    ]
  },
  {
    id: '10',
    title: 'Final Interview Round',
    type: 'INTERVIEW',
    time: addDays(now, 3).toISOString(),
    assignee: { id: '1', name: 'John Doe', email: 'john@example.com' },
    attendees: [
      { id: '2', name: 'Sarah Wilson', email: 'sarah@example.com' },
      { id: '3', name: 'Mike Johnson', email: 'mike@example.com' },
      { id: '6', name: 'Tech Lead', email: 'techlead@example.com' }
    ],
    location: 'Zoom Meeting',
    description: 'Final round of interviews with shortlisted candidates.'
  }
];