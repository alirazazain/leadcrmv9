import { Client } from '../types/recruitment';
import { mockContacts } from './mockContacts';

export const mockRecruitmentClients: Client[] = [
  {
    id: '1',
    name: 'Eleven Dev Private Limited',
    industry: 'Technology',
    location: 'Sydney, Australia',
    website: 'https://www.demowebmark.com',
    linkedin: 'https://linkedin.com/company/elevendev',
    jobCount: 3,
    owner: {
      name: 'Ali R Zain',
      email: 'liam12@gmail.com'
    },
    contacts: mockContacts,
    createdAt: '2024-03-10T10:00:00Z',
    updatedAt: '2024-03-11T15:30:00Z'
  },
  // ... rest of the clients
];