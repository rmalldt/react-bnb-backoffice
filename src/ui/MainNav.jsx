import * as S from '../styles';
import {
  HiOutlineCalendar,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUserGroup,
} from 'react-icons/hi2';

function MainNav() {
  return (
    <nav>
      <S.NavList>
        <li>
          <S.StyledNavLink to="/dashboard">
            <HiOutlineHome /> Home
          </S.StyledNavLink>
        </li>
        <li>
          <S.StyledNavLink to="/bookings">
            <HiOutlineCalendar />
            Bookings
          </S.StyledNavLink>
        </li>
        <li>
          <S.StyledNavLink to="/cabins">
            <HiOutlineHomeModern />
            Cabins
          </S.StyledNavLink>
        </li>
        <li>
          <S.StyledNavLink to="/users">
            <HiOutlineUserGroup />
            Users
          </S.StyledNavLink>
        </li>
        <li>
          <S.StyledNavLink to="/settings">
            <HiOutlineCog6Tooth />
            Settings
          </S.StyledNavLink>
        </li>
      </S.NavList>
    </nav>
  );
}

export default MainNav;
