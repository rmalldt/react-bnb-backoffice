import UpdateSettingsForm from '../features/settings/UpdateSettingsForm';
import * as S from '../styles';

function Settings() {
  return (
    <S.Row>
      <S.Heading as="h1">Update hotel settings</S.Heading>
      <UpdateSettingsForm />
    </S.Row>
  );
}

export default Settings;
