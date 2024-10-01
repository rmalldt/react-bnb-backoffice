import { NavLink } from 'react-router-dom';
import * as S from '../styles';

function Logo() {
  return (
    <NavLink to="/dashboard">
      <S.LogoContainer>
        <S.LogoImg src="/logo-no-bg.png" alt="Logo" />
      </S.LogoContainer>
    </NavLink>
  );
}

export default Logo;
