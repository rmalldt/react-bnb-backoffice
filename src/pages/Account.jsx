import * as S from '../styles';

function Account() {
  return (
    <>
      <S.Heading as="h1">Update your account</S.Heading>

      <S.RowDiv>
        <S.Heading as="h3">Update user data</S.Heading>
        <p>Update user data form</p>
      </S.RowDiv>

      <S.RowDiv>
        <S.Heading as="h3">Update password</S.Heading>
        <p>Update user password form</p>
      </S.RowDiv>
    </>
  );
}

export default Account;
