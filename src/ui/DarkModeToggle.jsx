import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2';
import * as S from '../styles';
import { useDarkMode } from '../features/context/DarkModeContext';

function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <S.ButtonIcon onClick={toggleDarkMode}>
      {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </S.ButtonIcon>
  );
}

export default DarkModeToggle;
