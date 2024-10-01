import PropTypes from 'prop-types';
import { createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { HiEllipsisVertical } from 'react-icons/hi2';
import { useOutsideClick } from '../hooks/useOutsideClick';
import * as S from '../styles';

Menus.propTypes = {
  children: PropTypes.any,
};

Button.propTypes = {
  children: PropTypes.any,
  icon: PropTypes.object,
  onClick: PropTypes.func,
};

List.propTypes = {
  id: PropTypes.number,
  children: PropTypes.any,
};

// 1. Context
const MenusContext = createContext();

// 2. Parent component
function Menus({ children }) {
  const [openId, setOpenId] = useState('');
  const [position, setPosition] = useState(null);

  const open = setOpenId;

  const close = () => setOpenId('');

  return (
    <MenusContext.Provider
      value={{
        openId,
        open,
        close,
        position,
        setPosition,
      }}
    >
      {children}
    </MenusContext.Provider>
  );
}

// 3. Child components
function Toggle({ id }) {
  const { openId, open, close, setPosition } = useContext(MenusContext);

  function handleClick(e) {
    e.stopPropagation();
    const rect = e.target.closest('button').getBoundingClientRect();

    const position = {
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    };

    setPosition(position);

    openId === '' || openId !== id ? open(id) : close();
  }

  return (
    <S.MenuToggleButton onClick={e => handleClick(e)}>
      <HiEllipsisVertical />
    </S.MenuToggleButton>
  );
}

function List({ id, children }) {
  const { openId, close, position } = useContext(MenusContext);

  const ref = useOutsideClick(close);

  if (openId !== id) return null;

  return createPortal(
    <S.MenuList ref={ref} $position={position}>
      {children}
    </S.MenuList>,
    document.body
  );
}

function Button({ children, icon, onClick }) {
  const { close } = useContext(MenusContext);

  function handleClick() {
    onClick?.();
    close();
  }
  return (
    <li>
      <S.MenuButton onClick={handleClick}>
        {icon}
        <span>{children}</span>
      </S.MenuButton>
    </li>
  );
}

Menus.Menu = S.Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
