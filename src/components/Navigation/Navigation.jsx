

import { useAuth } from 'redux/hook';
import { Nav, StyledNavLink } from '../AppBar/AppBar.styled';

export const Navigation = () => {
  const {isLoggedIn} = useAuth();
  

  return (
    <Nav>
      <StyledNavLink to="/">Home</StyledNavLink>
      {isLoggedIn && <StyledNavLink to="/contacts">Contacts</StyledNavLink>}
    </Nav>
  );
};
