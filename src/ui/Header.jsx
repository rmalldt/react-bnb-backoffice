import styled from 'styled-components';
import * as S from '../styles';
import HeaderMenu from './HeaderMenu';
import UserAvatar from '../features/authentication/UserAvatar';

export const HeaderDiv = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.8rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  grid-column: 2 / 3;
  grid-row: 1 /2;

  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: flex-end;
`;

function Header() {
  return (
    <HeaderDiv>
      <UserAvatar />
      <HeaderMenu />
    </HeaderDiv>
  );
}

export default Header;
