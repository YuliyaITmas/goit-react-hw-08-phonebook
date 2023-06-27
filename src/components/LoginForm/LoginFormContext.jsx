import { useFormikContext } from 'formik';
import {
  Forma,
  Label,
  Input,
  Button,
  Error,
} from 'components/RegistrationForm/RegistrationForm.styled';

export const LoginFormContext = () => {
  const { values, handleChange, dirty, handleSubmit } = useFormikContext();

  return (
    <Forma onSubmit={handleSubmit}>
      <Label htmlFor="email">
        Registered Email {''}
        <Input
          id="email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
        />
        <Error name="email" component="div" />
      </Label>

      <Label htmlFor="password">
        Password{''}
        <Input
          id="password"
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
        />
        <Error name="password" component="div" />
      </Label>

      <Button
        type="submit"
        disabled={!dirty || !values.email || !values.password}
      >
        Log In
      </Button>
    </Forma>
  );
};
