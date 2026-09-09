import { useEffect, useRef } from 'react';
import { gsap } from '../../utils/gsapSetup';
import './CustomCursor.css';

/**
 * Cursor discreto e personalizado — somente desktop (mouse fino).
 * Aumenta suavemente e ganha glow azul sobre elementos interativos,
 * sem prejudicar a usabilidade (o cursor padrão nunca é removido em touch).
 */
export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const supportsFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!supportsFinePointer) return undefined;

    document.body.classList.add('has-custom-cursor');

    const dot = dotRef.current;
    const ring = ringRef.current;
    const ringPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const quickDotX = gsap.quickTo(dot, 'x', { duration: 0.1, ease: 'power3.out' });
    const quickDotY = gsap.quickTo(dot, 'y', { duration: 0.1, ease: 'power3.out' });
    const quickRingX = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power3.out' });
    const quickRingY = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power3.out' });

    const handleMove = (event) => {
      quickDotX(event.clientX);
      quickDotY(event.clientY);
      quickRingX(event.clientX);
      quickRingY(event.clientY);
      ringPos.x = event.clientX;
      ringPos.y = event.clientY;
    };

    const interactiveSelector = 'a, button, [role="button"], input, textarea, .tilt-target, .cursor-hover';

    const handleOver = (event) => {
      if (event.target.closest?.(interactiveSelector)) {
        ring.classList.add('is-active');
      }
    };
    const handleOut = (event) => {
      if (event.target.closest?.(interactiveSelector)) {
        ring.classList.remove('is-active');
      }
    };
    const handleDown = () => ring.classList.add('is-pressed');
    const handleUp = () => ring.classList.remove('is-pressed');

    window.addEventListener('mousemove', handleMove, { passive: true });
    document.addEventListener('mouseover', handleOver);
    document.addEventListener('mouseout', handleOut);
    window.addEventListener('mousedown', handleDown);
    window.addEventListener('mouseup', handleUp);

    return () => {
      document.body.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseout', handleOut);
      window.removeEventListener('mousedown', handleDown);
      window.removeEventListener('mouseup', handleUp);
    };
  }, []);

  return (
    <div className="custom-cursor" aria-hidden="true">
      <div ref={dotRef} className="custom-cursor__dot" />
      <div ref={ringRef} className="custom-cursor__ring" />
    </div>
  );
}
