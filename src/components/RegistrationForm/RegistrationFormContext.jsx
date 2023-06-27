

import React from 'react';

import { useFormikContext } from 'formik';
import {
  Forma,
  Label,
  Input,
  Button,
  Error,
} from 'components/RegistrationForm/RegistrationForm.styled';



export const RegistrationFormContext = () => {
  const {
    values,
    handleChange,
    errors,
    touched,
    handleBlur,
    isValid,
    dirty,
    handleSubmit,
  } = useFormikContext();

  return (
    <Forma onSubmit={handleSubmit}>
      <Label htmlFor="name">
        Name{''}
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Enter name"
          value={values.name}
          onBlur={handleBlur}
          onChange={handleChange}
          pattern="^[А-Яа-яЁёіІїЇґҐa-zA-Z]+([-\s][А-Яа-яЁёіІїЇґҐa-zA-Z]+)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        />
        {touched.name && errors.name && <Error>{errors.name}</Error>}
        <Error name="name" component="div" />
      </Label>

      <Label htmlFor="email">
        Email{''}
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Enter email"
          value={values.email}
          onBlur={handleBlur}
          onChange={handleChange}
          pattern=".{6,}@mail\.com"
          title="Please enter a valid email address ending with @mail.com. The part before '@' should be at least 6 characters long."
        />
        {touched.email && errors.email && <Error>{errors.email}</Error>}
        <Error name="email" component="div" />
      </Label>

      <Label htmlFor="password">
        Password{''}
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Enter password"
          value={values.password}
          onBlur={handleBlur}
          onChange={handleChange}
          title="Password should be of minimum 8 characters length"
        />
        {touched.password && errors.password && (
          <Error>{errors.password}</Error>
        )}
        <Error name="password" component="div" />
      </Label>

      <Button type="submit" disabled={!dirty || !isValid}>
        Sign Up
      </Button>
    </Forma>
  );
};
