import ScrollToTop from '@/hooks/scroll-to-top';
import NotFound from '@/pages/not-found';
import { Suspense, lazy } from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import LoginRoute from './private/LoginRoute';
import RoleRoute from './private/RoleRoute';
const AuthLayout = lazy(() => import('@/components/layout/auth-layout'));
const PublicLayout = lazy(() => import('@/components/layout/public-layout'));
const LoginPage = lazy(() => import('@/pages/auth/login'));
const RegisterPage = lazy(() => import('@/pages/auth/register'));
const ForgotPasswordPage = lazy(() => import('@/pages/auth/forgot-password'));
const NewPasswordPage = lazy(() => import('@/pages/auth/new-password'));
const OAuth2Page = lazy(() => import('@/pages/auth/oauth2'));
const DashboardLayout = lazy(
  () => import('@/components/layout/dashboard-layout')
);

// Home & Landing Pages
const HomePage = lazy(() => import('@/pages/home'));
const BlogPage = lazy(() => import('@/pages/blog'));
const BlogDetailPage = lazy(() => import('@/pages/blog/detail'));
const GuidelinesPage = lazy(() => import('@/pages/resources/guidelines'));
const FormsPage = lazy(() => import('@/pages/resources/forms'));
const LibraryPage = lazy(() => import('@/pages/resources/library'));
const PoliciesPage = lazy(() => import('@/pages/resources/policies'));

// Dashboard Pages
const DashboardPage = lazy(() => import('@/pages/dashboard'));

// Student Health Records
const StudentRecordsPage = lazy(() => import('@/pages/student-records'));
const StudentDetailPage = lazy(() => import('@/pages/student-records/detail'));
const EditStudentRecordPage = lazy(
  () => import('@/pages/student-records/edit')
);
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
const EditMedicalSupplyPage = lazy(() => import('@/pages/medications/edit'));
const MedicationRequestsPage = lazy(
  () => import('@/pages/medications/requests')
);
const AddMedicationRequestPage = lazy(
  () => import('@/pages/medications/requests/add')
);
const MedicationRequestDetailPage = lazy(
  () => import('@/pages/medications/requests/detail')
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

// User Management
const ProfilePage = lazy(() => import('@/pages/profile'));
const NotificationPage = lazy(() => import('@/pages/notifications'));
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
        }
      ]
    },
    // Public Routes
    {
      path: '/',
      element: (
        <PublicLayout>
          <Suspense>
            <ScrollToTop />
            <Outlet />
          </Suspense>
        </PublicLayout>
      ),
      children: [
        {
          path: '/blog',
          element: <BlogPage />
        },
        {
          path: '/blog/:id',
          element: <BlogDetailPage />
        },
        {
          path: '/resources/guidelines',
          element: <GuidelinesPage />
        },
        {
          path: '/resources/forms',
          element: <FormsPage />
        },
        {
          path: '/resources/library',
          element: <LibraryPage />
        },
        {
          path: '/resources/policies',
          element: <PoliciesPage />
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
          path: '/register',
          element: <RegisterPage />
        },
        {
          path: '/auth/oauth2',
          element: <OAuth2Page />
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
        {
          path: 'student-records/:id/edit',
          element: <EditStudentRecordPage />
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
          element: (
            <RoleRoute allowedRoles={['Admin', 'SchoolNurse']}>
              <MedicationsPage />
            </RoleRoute>
          )
        },
        {
          path: 'medications/add',
          element: (
            <RoleRoute allowedRoles={['Admin', 'SchoolNurse']}>
              <AddMedicationPage />
            </RoleRoute>
          )
        },
        {
          path: 'medications/edit/:id',
          element: (
            <RoleRoute allowedRoles={['Admin', 'SchoolNurse']}>
              <EditMedicalSupplyPage />
            </RoleRoute>
          )
        },
        {
          path: 'medications/requests',
          element: <MedicationRequestsPage />
        },
        {
          path: 'medications/requests/:id',
          element: <MedicationRequestDetailPage />
        },
        {
          path: 'medications/requests/add',
          element: (
            <RoleRoute allowedRoles={['Parent']}>
              <AddMedicationRequestPage />
            </RoleRoute>
          )
        },
        // Vaccination Management Routes
        {
          path: 'vaccinations',
          element: (
            <RoleRoute allowedRoles={['Admin', 'SchoolNurse']}>
              <VaccinationsPage />
            </RoleRoute>
          )
        },
        {
          path: 'vaccinations/campaign',
          element: (
            <RoleRoute allowedRoles={['Admin', 'SchoolNurse']}>
              <VaccinationCampaignPage />
            </RoleRoute>
          )
        },
        {
          path: 'vaccinations/:id',
          element: (
            <RoleRoute allowedRoles={['Admin', 'SchoolNurse']}>
              <VaccinationDetailPage />
            </RoleRoute>
          )
        },
        // Health Checkups Routes
        {
          path: 'health-checkups',
          element: (
            <RoleRoute allowedRoles={['Admin', 'SchoolNurse']}>
              <HealthCheckupsPage />
            </RoleRoute>
          )
        },
        {
          path: 'health-checkups/campaign',
          element: (
            <RoleRoute allowedRoles={['Admin', 'SchoolNurse']}>
              <HealthCheckupCampaignPage />
            </RoleRoute>
          )
        },
        {
          path: 'health-checkups/:id',
          element: (
            <RoleRoute allowedRoles={['Admin', 'SchoolNurse']}>
              <HealthCheckupDetailPage />
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
