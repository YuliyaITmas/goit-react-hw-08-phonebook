
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from 'redux/hook';

export const PublicRoute = ({ children }) => {
  const{isToken} = useAuth()

  const location = useLocation();

  return !isToken ? children : <Navigate to={location.state?.from ?? '/'} />;
};
