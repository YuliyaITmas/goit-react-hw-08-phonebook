import { Helmet, HelmetProvider } from 'react-helmet-async';
import { RegistrationForm } from 'components/RegistrationForm/RegistrationForm';
import { Container } from 'components/App.styled';

export default function Registration  ()  {
 return (
   <Container>
     <HelmetProvider>
       <Helmet>
         <title>Registration</title>
       </Helmet>
       <RegistrationForm />
     </HelmetProvider>
   </Container>
 );
};
