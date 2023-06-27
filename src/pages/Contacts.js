import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';

import { Filter } from 'components/Filter/Filter';
import { Container, Title } from 'components/App.styled';
import { Helmet, HelmetProvider } from 'react-helmet-async';

export default function Contacts() {
  return (
    <HelmetProvider>
      <Container>
        <Helmet>
          <title>Your Contacts</title>
        </Helmet>
        <Title>Phonebook</Title>
        <ContactForm />
        <Title>Contacts</Title>
        <Filter />
        <ContactList />
      </Container>
    </HelmetProvider>
  );
}
