
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from 'redux/hook';

export const PrivateRoute = ({ children }) => {
   const { isToken } = useAuth();
  const location = useLocation();

  

  return isToken ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location.pathname }} />
  );
};
