import UpdatePasswordForm from '../features/authentication/UpdatePasswordForm';
import UpdateUserDataForm from '../features/authentication/UpdateUserDataForm';
import * as S from '../styles';

function Account() {
  return (
    <>
      <S.Heading as="h1">Update your account</S.Heading>

      <S.RowDiv>
        <S.Heading as="h3">Update user data</S.Heading>
        <UpdateUserDataForm />
      </S.RowDiv>

      <S.RowDiv>
        <S.Heading as="h3">Update password</S.Heading>
        <UpdatePasswordForm />
      </S.RowDiv>
    </>
  );
}

export default Account;
