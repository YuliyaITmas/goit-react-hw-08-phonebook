import { StyledNavLink } from 'components/AppBar/AppBar.styled';


export const AuthNav = () => {
  return (
    <div>
      <StyledNavLink to="/registration">Registration</StyledNavLink>
      <StyledNavLink to="/login">LogIn</StyledNavLink>
    </div>
  );
};
