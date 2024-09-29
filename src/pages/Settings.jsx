import UpdateSettingsForm from '../features/settings/UpdateSettingsForm';
import StyledHeading from '../ui/StyledHeading';
import StyledRow from '../ui/StyledRow';

function Settings() {
  return (
    <StyledRow>
      <StyledHeading as="h1">Update hotel settings</StyledHeading>
      <UpdateSettingsForm />
    </StyledRow>
  );
}

export default Settings;
