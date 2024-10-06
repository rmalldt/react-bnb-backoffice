import { useState } from 'react';
import * as S from '../../styles';
import FormRowVertical from '../../ui/FormRowVertical';
import { useLogin } from './useLogin';

function LoginForm() {
  const [email, setEmail] = useState('tes@tes.com');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    login(
      { email, password },
      {
        onSettled: () => {
          setEmail('');
          setPassword('');
        },
      }
    );
  }

  return (
    <S.Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <S.Input
          type="email"
          id="email"
          autoComplete="username"
          value={email}
          onChange={e => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <S.Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical>
        <S.Button size="large" disabled={isLoading}>
          {!isLoading ? 'Log in' : <S.SpinnerMini />}
        </S.Button>
      </FormRowVertical>
    </S.Form>
  );
}

export default LoginForm;
