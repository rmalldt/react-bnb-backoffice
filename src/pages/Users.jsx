import SignupForm from '../features/authentication/SignupForm';
import * as S from '../styles';

function NewUsers() {
  return (
    <>
      <S.Heading as="h1">Create a new user</S.Heading>
      <SignupForm />
    </>
  );
}

export default NewUsers;
