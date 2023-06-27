import { Formik } from 'formik';
import { RegistrationFormContext } from 'components/RegistrationForm/RegistrationFormContext';
import * as yup from 'yup';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { useRegisterMutation } from 'redux/authorization/authApi';
import { useDispatch } from 'react-redux';
import { setError, setToken } from 'redux/authorization/authSlice';
import Loader from 'components/Loader/Loader';
import { useNavigate } from 'react-router-dom';

export const RegistrationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const handleSubmit = async (values, { resetForm }) => {
    // alert(JSON.stringify(values, null, 2));
    try {
      const response = await register({
        name: values.name,
        email: values.email,
        password: values.password,
      }).unwrap();

      if (response.token) {
        dispatch(setToken(response.token));
        navigate('/login');
      }

      resetForm();
    } catch (error) {
      Notify.failure(`Registration error: ${error.status}`);
      dispatch(setError(error));
      navigate('/registration');
    }
  };

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .min(3, 'Name must be at least 3 characters')
      .max(30, 'Name must be at most 20 characters')
      .matches(
        /^[А-Яа-яЁёіІїЇґҐa-zA-Z]+([-\s][А-Яа-яЁёіІїЇґҐa-zA-Z]+)*$/,
        'Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d`Artagnan'
      )
      .required('Name is required'),
    email: yup
      .string()
      .matches(
        /.{6,}@mail\.com$/,
        'Email should end with @mail.com and have at least 6 characters before @'
      )
      .required('Email is required'),

    password: yup
      .string()
      .min(8, 'Password should be of minimum 8 characters length')
      .required('Password is required'),
  });

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <>
          {isLoading && <Loader />} <RegistrationFormContext />
        </>
      )}
    </Formik>
  );
};
