import { useEffect, useState } from 'react';

/**
 * Detecta dispositivos touch/mobile para alternar entre interações de
 * mouse (tilt 3D, cursor customizado) e interações touch (scroll/tap).
 */
export function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
    const smallViewport = window.innerWidth < 900;
    const noHover = window.matchMedia('(hover: none)').matches;
    setIsTouch(coarsePointer || noHover || smallViewport);

    const handleResize = () => {
      setIsTouch(
        window.matchMedia('(pointer: coarse)').matches ||
          window.matchMedia('(hover: none)').matches ||
          window.innerWidth < 900
      );
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isTouch;
}
