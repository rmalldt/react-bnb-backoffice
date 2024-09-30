import { useEffect, useRef } from 'react';

export function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef();

  useEffect(() => {
    const handleClick = e => {
      if (ref.current && !ref.current.contains(e.target)) {
        console.log('HANDLER');
        handler();
      }
    };
    // Handle event in the capturing phase.
    // The model window is rendered on portal (direct child of body)
    // If the event is handled on bubbling phase the model window opens but closes immediately.
    document.addEventListener('click', handleClick, listenCapturing);

    return () => document.removeEventListener('click', handleClick);
  }, [handler, listenCapturing]);

  return ref;
}
