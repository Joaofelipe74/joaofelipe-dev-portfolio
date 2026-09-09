import { forwardRef, lazy, Suspense, useEffect, useRef, useState } from 'react';
import GlowButton from '../components/ui/GlowButton';
import { useMousePosition } from '../hooks/useMousePosition';
import { useDeviceCapability } from '../hooks/useDeviceCapability';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { BRAND, getWhatsAppLink } from '../config/site';
import './Hero.css';

const HeroScene = lazy(() => import('../components/three/HeroScene'));

export default function Hero() {
  const sectionRef = useRef(null);
  const cssLogoRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);
  const quality = useDeviceCapability();
  const mouseRef = useMousePosition();
  const scrollRef = useRef(0);

  const headingRef = useScrollReveal({ variant: 'perspective', duration: 1.1 });
  const paragraphRef = useScrollReveal({ variant: 'up', delay: 0.15 });
  const actionsRef = useScrollReveal({ variant: 'up', delay: 0.28 });

  // Pausa a cena 3D quando o Hero sai da viewport (custo zero fora de vista).
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), {
      threshold: 0.05,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Progresso de scroll dentro do Hero (0 -> 1), lido pela cena 3D via ref.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return undefined;

    let frame;
    const handleScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const progress = Math.min(Math.max(-rect.top / rect.height, 0), 1);
        scrollRef.current = progress;

        if (cssLogoRef.current) {
          cssLogoRef.current.style.transform = `translate3d(0, ${progress * -60}px, 0) scale(${1 - progress * 0.12})`;
          cssLogoRef.current.style.opacity = String(1 - progress * 0.6);
        }
        frame = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Fallback em CSS puro (mobile / reduced-motion / dispositivos fracos):
  // ainda assim parallax sutil seguindo o dedo/mouse, sem WebGL.
  useEffect(() => {
    if (quality !== 'static') return undefined;
    let frame;
    const handleMove = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        const { x, y } = mouseRef.current;
        if (cssLogoRef.current) {
          cssLogoRef.current.style.setProperty('--mx', x.toFixed(3));
          cssLogoRef.current.style.setProperty('--my', y.toFixed(3));
        }
        frame = null;
      });
    };
    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [quality, mouseRef]);

  return (
    <section id="inicio" ref={sectionRef} className="hero">
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__bg-grid" />
        {quality !== 'static' ? (
          <Suspense fallback={<StaticLogoBackdrop ref={cssLogoRef} />}>
            <HeroScene mouseRef={mouseRef} scrollRef={scrollRef} quality={quality} active={isVisible} />
          </Suspense>
        ) : (
          <StaticLogoBackdrop ref={cssLogoRef} />
        )}
        <div className="hero__vignette" />
      </div>

      <div className="container hero__content">
        <div ref={headingRef}>
          <h1 className="hero__title">
            <span className="text-gradient-chrome">JOÃO FELIPE</span>{' '}
            <span className="text-gradient-electric">DEV</span>
          </h1>
          <p className="hero__role">{BRAND.role}</p>
          <p className="hero__headline">{BRAND.headline}</p>
        </div>

        <p ref={paragraphRef} className="hero__paragraph">
          {BRAND.subheadline}
        </p>

        <div ref={actionsRef} className="hero__actions">
          <GlowButton as="a" href="#projetos" variant="primary" className="cursor-hover">
            Ver Projetos
          </GlowButton>
          <GlowButton
            as="a"
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            variant="ghost"
            className="cursor-hover"
          >
            Solicitar Orçamento
          </GlowButton>
        </div>
      </div>

      <a href="#sobre" className="hero__scroll-cue cursor-hover" aria-label="Rolar para a próxima seção">
        <span />
      </a>
    </section>
  );
}

const StaticLogoBackdrop = forwardRef(function StaticLogoBackdrop(props, ref) {
  return (
    <div className="hero__static-logo" ref={ref} {...props}>
      <picture>
        <source media="(max-width: 640px)" srcSet="/assets/logo/jf-emblem-sm.webp" type="image/webp" />
        <source srcSet="/assets/logo/jf-emblem.webp" type="image/webp" />
        <img
          src="/assets/logo/jf-emblem.png"
          alt=""
          aria-hidden="true"
          fetchpriority="high"
          sizes="(max-width: 640px) 78vw, 620px"
        />
      </picture>
    </div>
  );
});
