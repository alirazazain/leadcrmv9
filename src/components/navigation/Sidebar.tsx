import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Building2,
  Users,
  Settings,
  ChevronDown,
  MailCheck,
  UserSquare2,
  ChevronRight,
  BarChart3,
  UserCog,
  Users2,
  Briefcase,
  Building,
  UserPlus,
  ClipboardCheck,
  Inbox,
  FileText,
  PieChart,
} from 'lucide-react';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
}

function NavItem({ to, icon, label }: NavItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-150 ease-in-out ${
          isActive
            ? 'text-indigo-600 bg-indigo-50'
            : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50'
        }`
      }
    >
      <span className="p-1">{icon}</span>
      <span className="ml-2">{label}</span>
    </NavLink>
  );
}

interface NavGroupProps {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

function NavGroup({ label, icon, children }: NavGroupProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="space-y-1">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-600 rounded-lg hover:text-indigo-600 hover:bg-indigo-50 transition-colors duration-150 ease-in-out"
      >
        <div className="flex items-center">
          <span className="p-1">{icon}</span>
          <span className="ml-2">{label}</span>
        </div>
        <span className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
          <ChevronDown className="h-4 w-4" />
        </span>
      </button>
      {isOpen && <div className="ml-4 space-y-1">{children}</div>}
    </div>
  );
}

export function Sidebar() {
  return (
    <div className="w-64 bg-white border-r border-gray-200 h-[calc(100vh-4rem)] overflow-y-auto">
      <div className="p-4 space-y-4">
        <NavItem
          to="/dashboard"
          icon={<LayoutDashboard className="h-5 w-5" />}
          label="Dashboard"
        />

        <NavGroup
          label="Recruitment"
          icon={<Briefcase className="h-5 w-5" />}
        >
          <NavItem
            to="/recruitment/clients"
            icon={<Building className="h-5 w-5" />}
            label="Clients"
          />
          <NavItem
            to="/recruitment/jobs"
            icon={<FileText className="h-5 w-5" />}
            label="Jobs"
          />
          <NavItem
            to="/recruitment/candidates"
            icon={<UserPlus className="h-5 w-5" />}
            label="Candidates"
          />
          <NavItem
            to="/recruitment/placements"
            icon={<ClipboardCheck className="h-5 w-5" />}
            label="Placements"
          />
          <NavItem
            to="/recruitment/inbox"
            icon={<Inbox className="h-5 w-5" />}
            label="Inbox"
          />
          <NavItem
            to="/recruitment/templates"
            icon={<FileText className="h-5 w-5" />}
            label="Templates"
          />
          <NavItem
            to="/recruitment/reports"
            icon={<PieChart className="h-5 w-5" />}
            label="Reports"
          />
        </NavGroup>

        <NavGroup
          label="Sales"
          icon={<ChevronRight className="h-5 w-5" />}
        >
          <NavItem
            to="/leads"
            icon={<UserSquare2 className="h-5 w-5" />}
            label="Leads"
          />
          <NavItem
            to="/companies"
            icon={<Building2 className="h-5 w-5" />}
            label="Companies"
          />
          <NavItem
            to="/email-verifier"
            icon={<MailCheck className="h-5 w-5" />}
            label="Find & Verify"
          />
        </NavGroup>

        <NavItem
          to="/analytics"
          icon={<BarChart3 className="h-5 w-5" />}
          label="Analytics"
        />

        <NavGroup
          label="Users"
          icon={<Users className="h-5 w-5" />}
        >
          <NavItem
            to="/users/list"
            icon={<Users2 className="h-5 w-5" />}
            label="Users"
          />
          <NavItem
            to="/users/teams"
            icon={<Users className="h-5 w-5" />}
            label="Teams"
          />
          <NavItem
            to="/users/roles"
            icon={<UserCog className="h-5 w-5" />}
            label="Roles"
          />
        </NavGroup>

        <NavItem
          to="/settings"
          icon={<Settings className="h-5 w-5" />}
          label="Settings"
        />
      </div>
    </div>
  );
}