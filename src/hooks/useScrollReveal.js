import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../utils/gsapSetup';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

/**
 * Anima a entrada de elementos conforme o usuário rola a página.
 *
 * Diferente de um fade-in genérico, cada "variant" produz um movimento
 * coordenado diferente (deslocamento, profundidade, perspectiva ou escala),
 * conforme pedido: elementos devem surgir, deslizar, ganhar profundidade,
 * mudar de escala/perspectiva — não apenas aparecer.
 *
 * variants disponíveis:
 *   'up'          — desliza de baixo + fade
 *   'left'        — desliza da esquerda + fade
 *   'right'       — desliza da direita + fade
 *   'scale'       — cresce a partir de uma escala menor + fade
 *   'perspective' — entra com rotação 3D sutil (profundidade) + fade
 */
const VARIANTS = {
  up: { y: 56, x: 0, scale: 1, rotateX: 0, opacity: 0 },
  left: { y: 0, x: -64, scale: 1, rotateX: 0, opacity: 0 },
  right: { y: 0, x: 64, scale: 1, rotateX: 0, opacity: 0 },
  scale: { y: 24, x: 0, scale: 0.88, rotateX: 0, opacity: 0 },
  perspective: { y: 40, x: 0, scale: 0.96, rotateX: -12, opacity: 0 },
};

export function useScrollReveal({ variant = 'up', delay = 0, duration = 0.9, stagger = 0 } = {}) {
  const ref = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    if (prefersReducedMotion) {
      gsap.set(el.children.length && stagger ? el.children : el, { opacity: 1, clearProps: 'all' });
      return undefined;
    }

    const targets = stagger ? el.children : el;
    const from = VARIANTS[variant] || VARIANTS.up;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { ...from, transformPerspective: 800 },
        {
          y: 0,
          x: 0,
          scale: 1,
          rotateX: 0,
          opacity: 1,
          duration,
          delay,
          ease: 'power3.out',
          stagger: stagger || 0,
          scrollTrigger: {
            trigger: el,
            start: 'top 82%',
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [variant, delay, duration, stagger, prefersReducedMotion]);

  return ref;
}

/** Força um refresh do ScrollTrigger (usar após mudanças de layout/imagens). */
export function refreshScrollTrigger() {
  ScrollTrigger.refresh();
}
