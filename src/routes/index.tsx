import ScrollToTop from '@/hooks/scroll-to-top';
import NotFound from '@/pages/not-found';
import { Suspense, lazy } from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import RoleRoute from './private/RoleRoute';
import LoginRoute from './private/LoginRoute';

const AuthLayout = lazy(() => import('@/components/layout/auth-layout'));
const LoginPage = lazy(() => import('@/pages/auth/login'));
const ForgotPasswordPage = lazy(() => import('@/pages/auth/forgot-password'));
const NewPasswordPage = lazy(() => import('@/pages/auth/new-password'));

const DashboardLayout = lazy(
  () => import('@/components/layout/dashboard-layout')
);

// Home & Landing Pages
const HomePage = lazy(() => import('@/pages/home'));
const BlogPage = lazy(() => import('@/pages/blog'));
const BlogDetailPage = lazy(() => import('@/pages/blog/detail'));
const ResourcesPage = lazy(() => import('@/pages/resources'));

// Dashboard Pages
const DashboardPage = lazy(() => import('@/pages/dashboard'));

// Student Health Records
const StudentRecordsPage = lazy(() => import('@/pages/student-records'));
const StudentDetailPage = lazy(() => import('@/pages/student-records/detail'));
const AddStudentRecordPage = lazy(() => import('@/pages/student-records/add'));

// Medical Events
const MedicalEventsPage = lazy(() => import('@/pages/medical-events'));
const AddMedicalEventPage = lazy(() => import('@/pages/medical-events/add'));
const MedicalEventDetailPage = lazy(
  () => import('@/pages/medical-events/detail')
);

// Medication Management
const MedicationsPage = lazy(() => import('@/pages/medications'));
const AddMedicationPage = lazy(() => import('@/pages/medications/add'));
const MedicationRequestsPage = lazy(
  () => import('@/pages/medications/requests')
);

// Vaccination Management
const VaccinationsPage = lazy(() => import('@/pages/vaccinations'));
const VaccinationCampaignPage = lazy(
  () => import('@/pages/vaccinations/campaign')
);
const VaccinationDetailPage = lazy(() => import('@/pages/vaccinations/detail'));

// Health Checkups
const HealthCheckupsPage = lazy(() => import('@/pages/health-checkups'));
const HealthCheckupCampaignPage = lazy(
  () => import('@/pages/health-checkups/campaign')
);
const HealthCheckupDetailPage = lazy(
  () => import('@/pages/health-checkups/detail')
);

// Inventory Management
const InventoryPage = lazy(() => import('@/pages/inventory'));

// User Management
const ProfilePage = lazy(() => import('@/pages/profile'));
const NotificationPage = lazy(() => import('@/pages/notifications'));

// Other Pages
const PrivacyPage = lazy(() => import('@/pages/other/privacy'));
const TermsPage = lazy(() => import('@/pages/other/terms'));

// ----------------------------------------------------------------------

export default function AppRouter() {
  const systemRoute = [
    // Public Routes
    {
      path: '/',
      element: (
        <Suspense>
          <ScrollToTop />
          <Outlet />
        </Suspense>
      ),
      children: [
        {
          element: <HomePage />,
          index: true
        },
        {
          path: '/blog',
          element: <BlogPage />
        },
        {
          path: '/blog/:id',
          element: <BlogDetailPage />
        },
        {
          path: '/resources',
          element: <ResourcesPage />
        },
        {
          path: '/privacy',
          element: <PrivacyPage />
        },
        {
          path: '/terms',
          element: <TermsPage />
        }
      ]
    },
    // Auth Routes
    {
      path: '/',
      element: (
        <AuthLayout>
          <Suspense>
            <ScrollToTop />
            <Outlet />
          </Suspense>
        </AuthLayout>
      ),
      children: [
        {
          path: '/login',
          element: <LoginPage />
        },
        {
          path: '/forgot-password',
          element: <ForgotPasswordPage />
        },
        {
          path: '/new-password',
          element: <NewPasswordPage />
        }
      ]
    },
    // Protected Routes
    {
      path: '/dashboard',
      element: (
        <LoginRoute>
          <DashboardLayout>
            <Suspense>
              <ScrollToTop />
              <Outlet />
            </Suspense>
          </DashboardLayout>
        </LoginRoute>
      ),
      children: [
        {
          element: <DashboardPage />,
          index: true
        },
        // Student Health Records Routes
        {
          path: 'student-records',
          element: <StudentRecordsPage />
        },
        {
          path: 'student-records/add',
          element: <AddStudentRecordPage />
        },
        {
          path: 'student-records/:id',
          element: <StudentDetailPage />
        },
        // Medical Events Routes
        {
          path: 'medical-events',
          element: <MedicalEventsPage />
        },
        {
          path: 'medical-events/add',
          element: <AddMedicalEventPage />
        },
        {
          path: 'medical-events/:id',
          element: <MedicalEventDetailPage />
        },
        // Medication Management Routes
        {
          path: 'medications',
          element: <MedicationsPage />
        },
        {
          path: 'medications/add',
          element: <AddMedicationPage />
        },
        {
          path: 'medications/requests',
          element: <MedicationRequestsPage />
        },
        // Vaccination Management Routes
        {
          path: 'vaccinations',
          element: <VaccinationsPage />
        },
        {
          path: 'vaccinations/campaign',
          element: (
            <RoleRoute allowedRoles={['Admin', 'MedicalStaff']}>
              <VaccinationCampaignPage />
            </RoleRoute>
          )
        },
        {
          path: 'vaccinations/:id',
          element: <VaccinationDetailPage />
        },
        // Health Checkups Routes
        {
          path: 'health-checkups',
          element: <HealthCheckupsPage />
        },
        {
          path: 'health-checkups/campaign',
          element: (
            <RoleRoute allowedRoles={['Admin', 'MedicalStaff']}>
              <HealthCheckupCampaignPage />
            </RoleRoute>
          )
        },
        {
          path: 'health-checkups/:id',
          element: <HealthCheckupDetailPage />
        },
        // Inventory Management Routes
        {
          path: 'inventory',
          element: (
            <RoleRoute allowedRoles={['Admin', 'MedicalStaff']}>
              <InventoryPage />
            </RoleRoute>
          )
        },
        // User Management Routes
        {
          path: 'profile',
          element: <ProfilePage />
        },
        {
          path: 'notifications',
          element: <NotificationPage />
        }
      ]
    }
  ];

  const publicRoutes = [
    {
      path: '/404',
      element: <NotFound />
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />
    }
  ];

  const routes = useRoutes([...systemRoute, ...publicRoutes]);

  return routes;
}
