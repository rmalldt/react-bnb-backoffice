import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const LogoDiv = styled.div`
  text-align: center;
`;

const LogoImg = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  return (
    <NavLink to="/dashboard">
      <LogoDiv>
        <LogoImg src="/logo-no-bg.png" alt="Logo" />
      </LogoDiv>
    </NavLink>
  );
}

export default Logo;
