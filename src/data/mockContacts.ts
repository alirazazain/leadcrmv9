import { Contact } from '../types/contacts';

export const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'John Smith',
    designation: 'HR Manager',
    email: 'john.smith@example.com',
    phone: '+1 (555) 123-4567',
    linkedin: 'https://linkedin.com/in/johnsmith',
    notes: 'Primary contact for recruitment matters.'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    designation: 'Technical Lead',
    email: 'sarah.j@example.com',
    phone: '+1 (555) 234-5678',
    linkedin: 'https://linkedin.com/in/sarahjohnson',
    notes: 'Handles technical interviews and assessments.'
  },
  {
    id: '3',
    name: 'Michael Chen',
    designation: 'Engineering Director',
    email: 'm.chen@example.com',
    phone: '+1 (555) 345-6789',
    linkedin: 'https://linkedin.com/in/michaelchen',
    notes: 'Final decision maker for engineering hires.'
  },
  {
    id: '4',
    name: 'Emily Brown',
    designation: 'Talent Acquisition Specialist',
    email: 'emily.b@example.com',
    phone: '+1 (555) 456-7890',
    linkedin: 'https://linkedin.com/in/emilybrown',
    notes: 'Coordinates interview schedules and candidate communication.'
  },
  {
    id: '5',
    name: 'David Wilson',
    designation: 'CTO',
    email: 'd.wilson@example.com',
    phone: '+1 (555) 567-8901',
    linkedin: 'https://linkedin.com/in/davidwilson',
    notes: 'Involved in senior-level technical hires.'
  }
];