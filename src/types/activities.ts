export type ActivityType = 'PHONE_CALL' | 'MEETING' | 'TASK' | 'EMAIL' | 'INTERVIEW';

export interface ActivityAttachment {
  name: string;
  url: string;
}

export interface ActivityParticipant {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Activity {
  id: string;
  title: string;
  type: ActivityType;
  time: string;
  assignee: ActivityParticipant;
  attendees?: ActivityParticipant[];
  location?: string;
  description?: string;
  attachments?: ActivityAttachment[];
  reminder?: string;
}