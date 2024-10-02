import UpdateSettingsForm from '../features/settings/UpdateSettingsForm';
import * as S from '../styles';

function Settings() {
  return (
    <S.RowDiv>
      <S.Heading as="h1">Update hotel settings</S.Heading>
      <UpdateSettingsForm />
    </S.RowDiv>
  );
}

export default Settings;
