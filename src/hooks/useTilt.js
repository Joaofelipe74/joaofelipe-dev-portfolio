import { useCallback, useRef } from 'react';

/**
 * Inclinação 3D em CSS (perspective + rotateX/rotateY) que segue o cursor,
 * com uma "luz" que acompanha o ponteiro via custom properties CSS.
 * Usado pelos cards de serviços e pelos mockups de projetos.
 *
 * Uso:
 *   const { ref, onMouseMove, onMouseLeave } = useTilt({ max: 10 });
 *   <div ref={ref} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} />
 */
export function useTilt({ max = 12, scale = 1.02, glare = true } = {}) {
  const ref = useRef(null);
  const frame = useRef(null);

  const onMouseMove = useCallback(
    (event) => {
      const el = ref.current;
      if (!el) return;

      if (frame.current) cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width;
        const py = (event.clientY - rect.top) / rect.height;

        const rotateY = (px - 0.5) * max * 2;
        const rotateX = -(py - 0.5) * max * 2;

        el.style.setProperty('--tilt-rotate-x', `${rotateX.toFixed(2)}deg`);
        el.style.setProperty('--tilt-rotate-y', `${rotateY.toFixed(2)}deg`);
        el.style.setProperty('--tilt-scale', scale);
        if (glare) {
          el.style.setProperty('--glow-x', `${(px * 100).toFixed(1)}%`);
          el.style.setProperty('--glow-y', `${(py * 100).toFixed(1)}%`);
          el.style.setProperty('--glow-opacity', 1);
        }
      });
    },
    [max, scale, glare]
  );

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--tilt-rotate-x', `0deg`);
    el.style.setProperty('--tilt-rotate-y', `0deg`);
    el.style.setProperty('--tilt-scale', 1);
    el.style.setProperty('--glow-opacity', 0);
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}
