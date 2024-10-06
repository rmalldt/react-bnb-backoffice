import styled from 'styled-components';
import * as S from '../styles';
import Logout from '../features/authentication/Logout';
import { HiOutlineUser } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';

const HeaderList = styled.ul`
  display: flex;
  gap: 0.4rem;
`;

function HeaderMenu() {
  const navigate = useNavigate();
  return (
    <HeaderList>
      <li>
        <S.ButtonIcon onClick={() => navigate('/account')}>
          <HiOutlineUser />
        </S.ButtonIcon>
      </li>

      <li>
        <DarkModeToggle />
      </li>

      <li>
        <Logout />
      </li>
    </HeaderList>
  );
}

export default HeaderMenu;
