import { useEffect, useRef } from 'react';

/**
 * Rastreia a posição normalizada do mouse (-1 a 1 em x e y) dentro de um
 * elemento (ou da janela inteira). Usa refs em vez de state para não gerar
 * re-renders a cada movimento — quem consome deve ler `positionRef.current`
 * dentro de um loop de animação (rAF, useFrame do R3F, GSAP ticker, etc.).
 */
export function useMousePosition(targetRef) {
  const positionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const target = targetRef?.current || window;

    const handleMove = (event) => {
      const rect =
        target === window
          ? { left: 0, top: 0, width: window.innerWidth, height: window.innerHeight }
          : target.getBoundingClientRect();

      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      positionRef.current = { x, y };
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, [targetRef]);

  return positionRef;
}
