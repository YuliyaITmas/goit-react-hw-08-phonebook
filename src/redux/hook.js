import { useSelector } from 'react-redux';
import {
  getIsLoggedIn,
  getToken,
  getUser,
} from 'redux/authorization/authSelectors';

export const useAuth = () => {
  const isLoggedIn = useSelector(getIsLoggedIn);
  const isToken = useSelector(getToken);
  const user = useSelector(getUser);

  return {
    isLoggedIn,
    isToken,
    user,
  };
};
