import { Formik } from 'formik';
import { FormContext } from 'components/ContactForm/FormContext';
import * as yup from 'yup';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { useAddContactMutation, useGetContactsQuery } from 'redux/contactsApi';
import Loader from 'components/Loader/Loader';
import { nanoid } from '@reduxjs/toolkit';

const options = {
  width: '320px',
  fontSize: '20px',
  clickToClose: true,
  position: 'right-top',
  distance: '15px',
  borderRadius: '15px',
  timeout: 3000,
  showOnlyTheLastOne: true,
  pauseOnHover: true,
};

export const ContactForm = () => {
  const { data: contacts } = useGetContactsQuery();

  const [addContact, { isLoading: isAddingContact }] = useAddContactMutation();

  const handleSubmit = (values, { resetForm }) => {
    const isContactExists = contacts.some(
      contact =>
        (contact.name &&
          contact.name.toLowerCase().trim() ===
            values.name.toLowerCase().trim()) ||
        (contact.number && contact.number.trim() === values.number.trim())
    );
    if (isContactExists) {
      Notify.failure(`${values.name} is already in contacts`, options);
      resetForm();
      return;
    }
      const newContact = {
        id: nanoid(), 
        name: values.name,
        number: values.number,
      };

    addContact(newContact);
    resetForm();
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
    number: yup
      .string()
      .min(7, 'Number must be at least 7 characters')
      .max(20, 'Number must be at most 13 characters')
      .matches(
        /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
        'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
      )
      .required('Number is required'),
  });

  return (
    <Formik
      initialValues={{
        name: '',
        number: '',
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <>
          {isAddingContact && <Loader />} <FormContext />
        </>
      )}
    </Formik>
  );
};
