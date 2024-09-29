import PropTypes from 'prop-types';
import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { HiXMark } from 'react-icons/hi2';
import styled from 'styled-components';

Window.propTypes = {
  children: PropTypes.any,
  name: PropTypes.string,
};

Modal.propTypes = {
  children: PropTypes.any,
};

const StyledModal = styled.div`
  /* center the modal */
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const StyledOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const StyledButton = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

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
  return cloneElement(children, { onClick: () => open(windowName) });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);

  const ref = useRef();

  useEffect(() => {
    const handleClick = e => {
      if (ref.current && !ref.current.contains(e.target)) {
        close();
      }
    };
    // Handle event in the capturing phase.
    // The model window is rendered on portal (direct child of body)
    // If the event is handled on bubbling phase the model window opens but closes immediately.
    document.addEventListener('click', handleClick, true);

    return () => document.removeEventListener('click', handleClick);
  }, [close]);

  if (name !== openName) return null;

  return createPortal(
    <StyledOverlay>
      <StyledModal ref={ref}>
        <StyledButton onClick={close}>
          <HiXMark />
        </StyledButton>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </StyledModal>
    </StyledOverlay>,
    document.body
  );
}

// 4. Add child components as property
Modal.Open = Open;
Modal.Window = Window;

export default Modal;
