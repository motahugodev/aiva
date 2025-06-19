import { getToken } from '@/utils/cookies';
import { Navigate, Outlet } from 'react-router';

const isAuthenticated = (): boolean => {
  return !!getToken();
};

const PrivateRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to='/auth/login' replace />;
};

export default PrivateRoute;
