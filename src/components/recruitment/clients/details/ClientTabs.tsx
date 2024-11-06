import { Tab } from './Tab';

interface ClientTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'activities', label: 'Activities' },
  { id: 'jobs', label: 'Jobs', count: 3 },
  { id: 'contacts', label: 'Contacts', count: 2 },
  { id: 'guests', label: 'Guests' },
  { id: 'notes', label: 'Notes' },
  { id: 'files', label: 'Files' },
  { id: 'agreements', label: 'Agreements' },
  { id: 'invoices', label: 'Invoices' }
];

export function ClientTabs({ activeTab, onTabChange }: ClientTabsProps) {
  return (
    <nav className="flex space-x-8 px-6" aria-label="Tabs">
      {tabs.map((tab) => (
        <Tab
          key={tab.id}
          id={tab.id}
          label={tab.label}
          count={tab.count}
          isActive={activeTab === tab.id}
          onClick={() => onTabChange(tab.id)}
        />
      ))}
    </nav>
  );
}