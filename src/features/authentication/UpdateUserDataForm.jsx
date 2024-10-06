import { useState } from 'react';
import FormRow from '../../ui/FormRow';
import * as S from '../../styles';

import { useUser } from './useUser';
import { useUpdateUser } from './useUpdateUser';

function UpdateUserDataForm() {
  const {
    user: {
      email,
      user_metadata: { fullName: currentFullName },
    },
  } = useUser();

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(null);

  const { updateUser, isUpdating } = useUpdateUser();

  function handleSubmit(e) {
    e.preventDefault();
    if (!fullName) return;

    updateUser(
      { fullName, avatar },
      {
        onSuccess: () => {
          setAvatar(null);
          e.target.reset();
        },
      }
    );
  }

  function handleCancel() {
    setFullName(currentFullName);
    setAvatar(null);
  }

  return (
    <S.Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <S.Input value={email} disabled />
      </FormRow>
      <FormRow label="Full name">
        <S.Input
          type="text"
          value={fullName}
          onChange={e => setFullName(e.target.value)}
          id="fullName"
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Avatar image">
        <S.FileInputButton
          id="avatar"
          accept="image/*"
          onChange={e => setAvatar(e.target.files[0])}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow>
        <S.Button
          type="reset"
          $variation="secondary"
          disabled={isUpdating}
          onClick={handleCancel}
        >
          Cancel
        </S.Button>
        <S.Button>Update account</S.Button>
      </FormRow>
    </S.Form>
  );
}

export default UpdateUserDataForm;
