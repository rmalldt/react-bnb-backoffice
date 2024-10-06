import { useForm } from 'react-hook-form';
import FormRow from '../../ui/FormRow';
import * as S from '../../styles';
import { useUpdateUser } from './useUpdateUser';

function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;

  const { updateUser, isUpdating } = useUpdateUser();

  function onSubmit({ password }) {
    updateUser({ password }, { onSuccess: reset });
  }

  return (
    <S.Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <S.Input
          type="password"
          id="password"
          autoComplete="current-password"
          disabled={isUpdating}
          {...register('password', {
            required: 'This field is required',
            minLength: {
              value: 8,
              message: 'Password must be minimum of 8 characters',
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Confirm password"
        error={errors?.passwordConfirm?.message}
      >
        <S.Input
          type="password"
          autoComplete="new-password"
          id="passwordConfirm"
          disabled={isUpdating}
          {...register('passwordConfirm', {
            required: 'This field is required',
            validate: value =>
              value === getValues().password ||
              'Password did not match. Please try again',
          })}
        />
      </FormRow>
      <FormRow>
        <S.Button onClick={reset} type="reset" $variation="secondary">
          Cancel
        </S.Button>
        <S.Button>Update password</S.Button>
      </FormRow>
    </S.Form>
  );
}

export default UpdatePasswordForm;
