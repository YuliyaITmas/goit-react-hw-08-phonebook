import React from 'react';
import { useEffect, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './Layout';
import { PrivateRoute } from './PrivateRoute';

import { setLoggedIn, setUser } from 'redux/authorization/authSlice';
import { useDispatch } from 'react-redux';
import { useAuth } from 'redux/hook';
import { useGetCurrentUserQuery } from 'redux/authorization/authApi';
import Loader from './Loader/Loader';

const Home = lazy(() => import('../pages/Home'));
const Registration = lazy(() => import('../pages/Registration'));
const Login = lazy(() => import('../pages/Login'));
const Contacts = lazy(() => import('../pages/Contacts'));

export const App = () => {
  const dispatch = useDispatch();
  const { user, isToken, isLoggedIn } = useAuth();

  const { data: currentUser, isLoading } = useGetCurrentUserQuery({
    skip: !isToken || !isLoggedIn || isToken === null || isToken === 'null',
  });

  useEffect(() => {
    if (isToken && currentUser) {
      dispatch(setUser(currentUser));
      dispatch(setLoggedIn(true));
    }
  }, [isToken, currentUser, isLoggedIn, user, dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="registration" element={<Registration />} />
          <Route path="login" element={<Login />} />
          <Route
            path="contacts"
            element={
              <PrivateRoute>
                {' '}
                <Contacts />{' '}
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </>
  );
};
