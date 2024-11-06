import { EmailTemplate } from '../types/email';

export const mockEmailTemplates: EmailTemplate[] = [
  {
    id: '1',
    name: 'Interview Confirmation',
    subject: 'Interview Confirmation: [Position] at [Company]',
    content: `Dear [Name],

We're writing to confirm your interview for the [Position] role at [Company].

Date: [Date]
Time: [Time]
Location: [Location]

Please let us know if you need to reschedule or have any questions.

Best regards,
[Your Name]`,
    category: 'Interview'
  },
  {
    id: '2',
    name: 'Follow-up Meeting',
    subject: 'Follow-up Meeting: Next Steps',
    content: `Hi [Name],

I hope this email finds you well. I'd like to schedule a follow-up meeting to discuss the next steps in our recruitment process.

Would any of these times work for you?
- [Option 1]
- [Option 2]
- [Option 3]

Looking forward to your response.

Best regards,
[Your Name]`,
    category: 'Meeting'
  },
  {
    id: '3',
    name: 'Document Request',
    subject: 'Required Documents for [Position]',
    content: `Dear [Name],

To proceed with your application for the [Position] role, we need the following documents:

1. Updated resume
2. Portfolio (if applicable)
3. References

Please send these at your earliest convenience.

Best regards,
[Your Name]`,
    category: 'Documentation'
  }
];