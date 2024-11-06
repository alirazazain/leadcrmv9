import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { LeadsPage } from '../pages/LeadsPage';
import { CreateLeadPage } from '../pages/CreateLeadPage';
import { LeadDetailsPage } from '../pages/LeadDetailsPage';
import { EditLeadPage } from '../pages/EditLeadPage';
import { CompaniesPage } from '../pages/CompaniesPage';
import { CreateCompanyPage } from '../pages/CreateCompanyPage';
import { CompanyDetailsPage } from '../pages/CompanyDetailsPage';
import { EditCompanyPage } from '../pages/EditCompanyPage';
import { EmailVerifierPage } from '../pages/EmailVerifierPage';
import { AnalyticsPage } from '../pages/AnalyticsPage';
import { UsersListPage } from '../pages/UsersListPage';
import { TeamsPage } from '../pages/TeamsPage';
import { RolesPage } from '../pages/RolesPage';
import { EditRolePage } from '../pages/EditRolePage';
import { SettingsPage } from '../pages/SettingsPage';
import { ProtectedRoute } from './ProtectedRoute';

// Recruitment Pages
import { ClientsPage } from '../pages/recruitment/ClientsPage';
import { ClientDetailsPage } from '../pages/recruitment/ClientDetailsPage';
import { JobsPage } from '../pages/recruitment/JobsPage';
import { CandidatesPage } from '../pages/recruitment/CandidatesPage';
import { PlacementsPage } from '../pages/recruitment/PlacementsPage';
import { InboxPage } from '../pages/recruitment/InboxPage';
import { TemplatesPage } from '../pages/recruitment/TemplatesPage';
import { ReportsPage } from '../pages/recruitment/ReportsPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: 'dashboard',
        element: <DashboardPage />,
      },
      // Recruitment Routes
      {
        path: 'recruitment/clients',
        element: <ClientsPage />,
      },
      {
        path: 'recruitment/clients/:id',
        element: <ClientDetailsPage />,
      },
      {
        path: 'recruitment/jobs',
        element: <JobsPage />,
      },
      {
        path: 'recruitment/candidates',
        element: <CandidatesPage />,
      },
      {
        path: 'recruitment/placements',
        element: <PlacementsPage />,
      },
      {
        path: 'recruitment/inbox',
        element: <InboxPage />,
      },
      {
        path: 'recruitment/templates',
        element: <TemplatesPage />,
      },
      {
        path: 'recruitment/reports',
        element: <ReportsPage />,
      },
      // Sales Routes
      {
        path: 'leads',
        element: <LeadsPage />,
      },
      {
        path: 'leads/create',
        element: <CreateLeadPage />,
      },
      {
        path: 'leads/:id',
        element: <LeadDetailsPage />,
      },
      {
        path: 'leads/:id/edit',
        element: <EditLeadPage />,
      },
      {
        path: 'companies',
        element: <CompaniesPage />,
      },
      {
        path: 'companies/create',
        element: <CreateCompanyPage />,
      },
      {
        path: 'companies/:id',
        element: <CompanyDetailsPage />,
      },
      {
        path: 'companies/:id/edit',
        element: <EditCompanyPage />,
      },
      {
        path: 'email-verifier',
        element: <EmailVerifierPage />,
      },
      {
        path: 'analytics',
        element: <AnalyticsPage />,
      },
      {
        path: 'users/list',
        element: <UsersListPage />,
      },
      {
        path: 'users/teams',
        element: <TeamsPage />,
      },
      {
        path: 'users/roles',
        element: <RolesPage />,
      },
      {
        path: 'users/roles/:id',
        element: <EditRolePage />,
      },
      {
        path: 'settings',
        element: <SettingsPage />,
      },
    ],
  },
]);

export function AppRoutes() {
  return <RouterProvider router={router} />;
}