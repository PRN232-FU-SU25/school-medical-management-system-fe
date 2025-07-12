import ScrollToTop from '@/hooks/scroll-to-top';
import NotFound from '@/pages/not-found';
import { Suspense, lazy } from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import RoleRoute from './private/RoleRoute';
import LoginRoute from './private/LoginRoute';

const AuthLayout = lazy(() => import('@/components/layout/auth-layout'));
const LoginPage = lazy(() => import('@/pages/auth-page/login/index'));
const ForgotPasswordPage = lazy(
  () => import('@/pages/auth-page/forgot-password/index')
);
const NewPasswordPage = lazy(
  () => import('@/pages/auth-page/new-password/index')
);

const DashboardLayout = lazy(
  () => import('@/components/layout/dashboard-layout')
);
const OverviewPage = lazy(
  () => import('@/pages/workspace-page/overview/index')
);
const NewContractPage = lazy(
  () => import('@/pages/workspace-page/contract/NewContract')
);
const AllContractPage = lazy(
  () => import('@/pages/workspace-page/contract/AllContract')
);
const AlmostExpiredPage = lazy(
  () => import('@/pages/workspace-page/contract/AlmostExpired')
);
const ExpiredPage = lazy(
  () => import('@/pages/workspace-page/contract/Expired')
);
const ContractTypePage = lazy(
  () => import('@/pages/workspace-page/contract/ContractType')
);
const ContractDetailPage = lazy(
  () => import('@/pages/workspace-page/contract/ContractDetail')
);
const CustomerPage = lazy(
  () => import('@/pages/workspace-page/customer/index')
);
const EmployeePage = lazy(
  () => import('@/pages/workspace-page/employee/index')
);
const DepartmentPage = lazy(() => import('@/pages/workspace-page/department/'));
const ReportPage = lazy(() => import('@/pages/workspace-page/report/index'));
const ProfilePage = lazy(() => import('@/pages/workspace-page/profile/index'));
const NotificationPage = lazy(
  () => import('@/pages/workspace-page/notification/index')
);

const PrivacyPage = lazy(() => import('@/pages/other-page/privacy/index'));
const TermsPage = lazy(() => import('@/pages/other-page/terms/index'));
const SuccessPage = lazy(
  () => import('@/pages/other-page/verify/verify-success')
);
const FailPage = lazy(() => import('@/pages/other-page/verify/verify-fail'));

// ----------------------------------------------------------------------

export default function AppRouter() {
  const systemRoute = [
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
          path: '/verify-success',
          element: <SuccessPage />
        },
        {
          path: '/verify-fail',
          element: <FailPage />
        }
      ]
    },
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
    {
      path: '/',
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
          element: <OverviewPage />,
          index: true
        },
        {
          path: '/contract/new',
          element: <NewContractPage />
        },
        {
          path: '/contract/all',
          element: <AllContractPage />
        },
        {
          path: '/contract/all-almost-expired',
          element: <AlmostExpiredPage />
        },
        {
          path: '/contract/all-expired',
          element: <ExpiredPage />
        },
        {
          path: '/contract/type',
          element: (
            <RoleRoute allowedRoles={['Admin']}>
              <ContractTypePage />
            </RoleRoute>
          )
        },
        {
          path: '/contract/:id',
          element: <ContractDetailPage />
        },
        {
          path: '/customer',
          element: (
            <RoleRoute allowedRoles={['Admin', 'Manager']}>
              <CustomerPage />
            </RoleRoute>
          )
        },
        {
          path: '/employee',
          element: (
            <RoleRoute allowedRoles={['Admin', 'Manager']}>
              <EmployeePage />
            </RoleRoute>
          )
        },
        {
          path: '/department',
          element: (
            <RoleRoute allowedRoles={['Admin']}>
              <DepartmentPage />
            </RoleRoute>
          )
        },
        {
          path: '/report',
          element: <ReportPage />
        },
        {
          path: '/privacy',
          element: <PrivacyPage />
        },
        {
          path: '/terms',
          element: <TermsPage />
        },
        {
          path: '/profile',
          element: <ProfilePage />
        },
        {
          path: '/notification',
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
