import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';

export const ContainerHeader = styled.div`
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
`;
export const HeaderWrapper = styled.header`
  background-color: #f2f2f2;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;
export const Nav = styled.nav`
  display: flex;
  align-items: center;
  background-color: #f2f2f2;
  padding: 16px;
`;

export const StyledNavLink = styled(NavLink)`
  color: #333;
  margin-right: 16px;
  text-decoration: none;
  font-size: 26px;

  &:hover {
    color: #000;
    text-decoration: underline;
  }

  &.active {
    font-weight: bold;
  }
`;
export const Wrapper = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;
  //   margin-bottom: 16px;
`;

export const LogoutButton = styled.button`
  background-color: #f2f2f2;
  color: #333;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 18px;
  font-weight: bold;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
  cursor: pointer;

  transition: all 0.3s ease;

  &:hover {
    background-color: #ddd;
    transform: scale(1.05);
  }
`;
export const Greeting = styled.div`
  font-size: 16px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
export const GreetingWrapper = styled.div`
  display: flex;
  text-align: center;
`;

export const GreetingText = styled.span`
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
  color: #888;
`;

export const UserName = styled.span`
  font-size: 24px;
  font-weight: bold;
`;
