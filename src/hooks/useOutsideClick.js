import { useEffect, useRef } from 'react';

// Register the event listener ready to be executed when clicked outside the component using this hook.
export function useOutsideClick(handler, listenCapturing = false) {
  const ref = useRef();

  useEffect(() => {
    const handleClick = e => {
      if (ref.current && !ref.current.contains(e.target)) {
        handler();
      }
    };
    document.addEventListener('click', handleClick, listenCapturing);

    return () => document.removeEventListener('click', handleClick);
  }, [handler, listenCapturing]);

  return ref;
}
