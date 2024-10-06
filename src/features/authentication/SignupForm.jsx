import FormRow from '../../ui/FormRow';
import * as S from '../../styles';
import { useForm } from 'react-hook-form';
import { useSignup } from './useSignup';
// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { signup, isLoading } = useSignup();
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;

  function onSubmit({ fullName, email, password }) {
    signup(
      { fullName, email, password },
      {
        onSettled: reset,
      }
    );
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <S.Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <S.Input
          type="text"
          id="fullName"
          {...register('fullName', { required: 'This field is required' })}
          disabled={isLoading}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <S.Input
          type="email"
          id="email"
          {...register('email', {
            required: 'This field is required',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Please provide a valid email',
            },
          })}
          disabled={isLoading}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <S.Input
          type="password"
          id="password"
          {...register('password', {
            required: 'This field is required',
            minLength: {
              value: 8,
              message: 'Passwords must be minimum of 8 characters',
            },
          })}
          disabled={isLoading}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <S.Input
          type="password"
          id="passwordConfirm"
          {...register('passwordConfirm', {
            required: 'This field is required',
            validate: value =>
              value === getValues().password ||
              'Password did not match. Please try again',
          })}
          disabled={isLoading}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <S.Button variation="secondary" type="reset">
          Cancel
        </S.Button>
        <S.Button>Create new user</S.Button>
      </FormRow>
    </S.Form>
  );
}

export default SignupForm;
