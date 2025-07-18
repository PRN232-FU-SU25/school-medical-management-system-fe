import __helpers from '@/helpers';
import { login } from '@/redux/auth.slice';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface LoginRouteProps {
  children: React.ReactNode;
}

const LoginRoute = ({ children }: LoginRouteProps) => {
  const dispatch = useDispatch();
  const [shouldNavigate, setShouldNavigate] = useState(false);

  useEffect(() => {
    const token = __helpers.cookie_get('AT');

    if (token) {
      try {
        dispatch(login());
      } catch (error) {
        console.error('Error decoding JWT token:', error);
        setShouldNavigate(true);
      }
    } else {
      setShouldNavigate(true);
    }
  }, [dispatch]);

  if (shouldNavigate) {
    return <Navigate to={'/login'} replace />;
  }

  return <>{children}</>;
};

export default LoginRoute;
