import { ContainerHome } from 'components/App.styled';

export default function Home() {
  return (
    <ContainerHome>
      <h1>
        "Welcome! Start managing your phonebook right now!"
        <span role="img" aria-label="Greeting icon">
          💁‍♀️
        </span>
      </h1>
    </ContainerHome>
  );
}
