import { Formik } from 'formik';
// import { FormWrap } from 'components/RegistrationForm/RegistrationForm.styled';
import { useDispatch } from 'react-redux';
import { setError, setToken, setUser } from 'redux/authorization/authSlice';
import { useNavigate } from 'react-router-dom';
import { useLogInMutation } from 'redux/authorization/authApi';
import Loader from 'components/Loader/Loader';
import { LoginFormContext } from './LoginFormContext';
import { Notify } from 'notiflix';
import { Container } from 'components/App.styled';

export const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useLogInMutation();

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await register({
        name: values.name,
        email: values.email,
        password: values.password,
      }).unwrap();

      if (response.token) {
        dispatch(setToken(response.token));
        dispatch(setUser(response.user));
        navigate('/contacts');
      }
    } catch (error) {
      Notify.failure(`Login error: ${error.status}`);
      dispatch(setError(error));
      navigate('/login');
    }

    resetForm();
  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={handleSubmit}
    >
      {() => (
        <Container>
          {isLoading && <Loader />} <LoginFormContext />
        </Container>
      )}
    </Formik>
  );
};
