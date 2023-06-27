import {
  Greeting,
  GreetingText,
  GreetingWrapper,
  LogoutButton,
  UserName,
  Wrapper,
} from 'components/AppBar/AppBar.styled';
import { Notify } from 'notiflix';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useLogOutMutation } from 'redux/authorization/authApi';
import { logout, setError } from 'redux/authorization/authSlice';
import { useAuth } from 'redux/hook';
import { RotatingLines } from 'react-loader-spinner';

export const UserMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logOut, { isLoading }] = useLogOutMutation();
  const { user, isLoggedIn } = useAuth();

  const handleLogout = async () => {
    try {
      await logOut().unwrap();
      dispatch(logout());
      window.location.reload()
      navigate('/');
    } catch (error) {
      Notify.failure(`Logout failed: ${error.status}`);
      dispatch(setError(error));
      navigate('/');
    }
  };
  if (!isLoggedIn) {
    navigate('/login');
  }

  if (isLoading) {
    return <RotatingLines width="26" strokeColor="grey" />;
  }

  return (
    <Wrapper>
      <GreetingWrapper>
        {' '}
        {user ? (
          <Greeting>
            <GreetingText>Welcome</GreetingText>{' '}
            <UserName>{user.name}</UserName>
          </Greeting>
        ) : null}
      </GreetingWrapper>
      <LogoutButton type="button" onClick={handleLogout}>
        LogOut
      </LogoutButton>
    </Wrapper>
  );
};
