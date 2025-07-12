import __helpers from '@/helpers';
import { login, setRole } from '@/redux/auth.slice';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

interface LoginRouteProps {
  children: React.ReactNode;
}

const LoginRoute = ({ children }: LoginRouteProps) => {
  const dispatch = useDispatch();

  const token = __helpers.cookie_get('AT');

  if (token) {
    try {
      const decodedToken: any = jwtDecode(token);

      const role =
        decodedToken.is_admin === 'True'
          ? 'Admin'
          : decodedToken.is_manager === 'True'
            ? 'Manager'
            : 'Employee';
      dispatch(setRole(role));
      dispatch(login());
    } catch (error) {
      console.error('Error decoding JWT token:', error);
      return <Navigate to={'/login'} replace />;
    }
  } else {
    return <Navigate to={'/login'} replace />;
  }

  return <>{children}</>;
};

export default LoginRoute;
