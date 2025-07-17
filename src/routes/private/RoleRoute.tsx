import { Navigate } from 'react-router-dom';
import __helpers from '@/helpers';

interface RoleRouteProps {
  allowedRoles: string[];
  children: React.ReactNode;
}

const RoleRoute = ({ allowedRoles, children }: RoleRouteProps) => {
  const userRole = __helpers.cookie_get('R');

  if (!userRole || !allowedRoles.includes(userRole)) {
    return <Navigate to="/404" replace />;
  }

  return <>{children}</>;
};

export default RoleRoute;
