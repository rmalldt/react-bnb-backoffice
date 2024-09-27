import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  return (
    <NavLink to="/dashboard">
      <StyledLogo>
        <Img src="/logo-no-bg.png" alt="Logo" />
      </StyledLogo>
    </NavLink>
  );
}

export default Logo;
