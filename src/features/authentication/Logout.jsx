import { HiArrowRightOnRectangle } from 'react-icons/hi2';
import * as S from '../../styles';
import { useLogout } from './useLogout';

function Logout() {
  const { logout, isLoggingout } = useLogout();

  return (
    <S.ButtonIcon onClick={() => logout()} disabled={isLoggingout}>
      {!isLoggingout ? <HiArrowRightOnRectangle /> : <S.SpinnerMini />}
    </S.ButtonIcon>
  );
}

export default Logout;
