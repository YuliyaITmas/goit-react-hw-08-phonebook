import { AuthNav } from 'components/AuthNav/AuthNav';
import { Navigation } from 'components/Navigation/Navigation';
import { UserMenu } from 'components/UserMenu/UserMenu';

import { useAuth } from 'redux/hook';
import { HeaderWrapper, ContainerHeader } from './AppBar.styled';


export const AppBar = () => {
  const { isLoggedIn } = useAuth();

  return (
 <ContainerHeader>
      <HeaderWrapper>
        <Navigation />
        {isLoggedIn ? <UserMenu /> : <AuthNav />}
      </HeaderWrapper>
 </ContainerHeader>
  );
};
