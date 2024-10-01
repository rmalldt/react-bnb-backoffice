import PropTypes from 'prop-types';
import { cloneElement, createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { HiXMark } from 'react-icons/hi2';
import { useOutsideClick } from '../hooks/useOutsideClick';
import * as S from '../styles';

Window.propTypes = {
  children: PropTypes.any,
  name: PropTypes.string,
};

Modal.propTypes = {
  children: PropTypes.any,
};

// 1. Context
const ModalContext = createContext();

// 2. Parent component
function Modal({ children }) {
  const [openName, setOpenName] = useState('');
  const close = () => setOpenName('');
  const open = setOpenName;

  return (
    <ModalContext.Provider
      value={{
        openName,
        close,
        open,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

// 3. Child components
function Open({ children, opens: windowName }) {
  const { open } = useContext(ModalContext);
  return cloneElement(children, {
    onClick: () => open(windowName),
  });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);
  const ref = useOutsideClick(close, true);

  if (name !== openName) return null;
  return createPortal(
    <S.ModalOverlay>
      <S.Modal ref={ref}>
        <S.ModalButton onClick={close}>
          <HiXMark />
        </S.ModalButton>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </S.Modal>
    </S.ModalOverlay>,
    document.body
  );
}

// 4. Add child components as property
Modal.Open = Open;
Modal.Window = Window;

export default Modal;
