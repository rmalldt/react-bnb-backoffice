import StyledHeading from '../ui/StyledHeading';
import StyledRow from '../ui/StyledRow';

function Account() {
  return (
    <>
      <StyledHeading as="h1">Update your account</StyledHeading>

      <StyledRow>
        <StyledHeading as="h3">Update user data</StyledHeading>
        <p>Update user data form</p>
      </StyledRow>

      <StyledRow>
        <StyledHeading as="h3">Update password</StyledHeading>
        <p>Update user password form</p>
      </StyledRow>
    </>
  );
}

export default Account;
