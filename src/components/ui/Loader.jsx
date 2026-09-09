import { useEffect, useRef } from 'react';
import { gsap } from '../../utils/gsapSetup';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { BRAND } from '../../config/site';
import './Loader.css';

/**
 * Animação de abertura — curta (≈1,8s), como a abertura de uma empresa de
 * tecnologia: tela escura → brilho azul → símbolo JF revelado → wordmark →
 * transição para a interface principal.
 */
export default function Loader({ onFinish }) {
  const rootRef = useRef(null);
  const glowRef = useRef(null);
  const emblemRef = useRef(null);
  const wordmarkRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    document.body.classList.add('is-loading');

    const finish = () => {
      document.body.classList.remove('is-loading');
      onFinish?.();
    };

    if (prefersReducedMotion) {
      const t = setTimeout(finish, 350);
      return () => clearTimeout(t);
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete: finish });

      tl.set(rootRef.current, { autoAlpha: 1 })
        .fromTo(glowRef.current, { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.55, ease: 'power2.out' })
        .fromTo(
          emblemRef.current,
          { opacity: 0, scale: 0.8, filter: 'blur(10px)' },
          { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.55, ease: 'power3.out' },
          '-=0.25'
        )
        .fromTo(
          wordmarkRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' },
          '-=0.15'
        )
        .to({}, { duration: 0.35 }) // pequena pausa para leitura
        .to(rootRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: 'power2.inOut',
          onComplete: () => gsap.set(rootRef.current, { autoAlpha: 0 }),
        });
    }, rootRef);

    return () => ctx.revert();
  }, [prefersReducedMotion, onFinish]);

  return (
    <div ref={rootRef} className="loader" role="status" aria-label={`Carregando ${BRAND.fullName}`}>
      <div ref={glowRef} className="loader__glow" aria-hidden="true" />
      <div className="loader__content">
        <img
          ref={emblemRef}
          className="loader__emblem"
          src="/assets/logo/jf-emblem.webp"
          alt=""
          aria-hidden="true"
          width="120"
          height="80"
        />
        <div ref={wordmarkRef} className="loader__wordmark">
          <span className="text-gradient-chrome">JOÃO FELIPE</span>{' '}
          <span className="text-gradient-electric">DEV</span>
        </div>
      </div>
    </div>
  );
}
