import { LoginForm } from 'components/LoginForm/LoginForm';
import { Helmet, HelmetProvider } from 'react-helmet-async';


export default function Login  ()  {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Login</title>
        </Helmet>
        <LoginForm />
      </HelmetProvider>
    </>
  );
}
