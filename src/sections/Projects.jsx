import { useEffect, useRef, useState } from 'react';
import SectionHeading from '../components/ui/SectionHeading';
import GlowButton from '../components/ui/GlowButton';
import { useTilt } from '../hooks/useTilt';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { gsap } from '../utils/gsapSetup';
import { projects } from '../data/projects';
import './Projects.css';

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const mockupRef = useRef(null);
  const infoRef = useRef(null);
  const touchStartX = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { ref: tiltRef, onMouseMove, onMouseLeave } = useTilt({ max: 11, scale: 1.02 });
  const headingRevealRef = useScrollReveal({ variant: 'up' });

  const activeProject = projects[activeIndex];

  // Combina a ref do tilt com a ref usada para a animação de transição.
  const setMockupRefs = (node) => {
    mockupRef.current = node;
    tiltRef.current = node;
  };

  useEffect(() => {
    if (prefersReducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        mockupRef.current,
        { rotateY: 46, opacity: 0, scale: 0.94 },
        { rotateY: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' }
      );
      gsap.fromTo(
        infoRef.current,
        { x: 28, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.08 }
      );
    });
    return () => ctx.revert();
  }, [activeIndex, prefersReducedMotion]);

  const goTo = (index) => setActiveIndex((index + projects.length) % projects.length);

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX;
  };
  const handleTouchEnd = (event) => {
    if (touchStartX.current === null) return;
    const delta = event.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 48) {
      goTo(activeIndex + (delta < 0 ? 1 : -1));
    }
    touchStartX.current = null;
  };

  return (
    <section id="projetos" className="projects section section--alt">
      <div className="container">
        <div ref={headingRevealRef}>
          <SectionHeading
            eyebrow="Projetos em destaque"
            title="Um retrato do que já foi construído"
            description="Alguns dos projetos desenvolvidos até aqui. Novos trabalhos são adicionados a esta vitrine continuamente."
          />
        </div>

        <div className="projects__showcase">
          <div
            className="projects__stage"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              ref={setMockupRefs}
              className={`device-mockup device-mockup--${activeProject.device} tilt-target`}
              onMouseMove={onMouseMove}
              onMouseLeave={onMouseLeave}
            >
              <div className="device-mockup__glare" aria-hidden="true" />
              {activeProject.device === 'mobile' && <div className="device-mockup__notch" aria-hidden="true" />}
              <div className="device-mockup__screen" style={{ aspectRatio: activeProject.screenRatio }}>
                <img
                  src={activeProject.image}
                  style={{ objectFit: activeProject.imageFit || 'cover' }}
                  alt={`Prévia do projeto ${activeProject.title}`}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              {activeProject.device === 'desktop' && (
                <div className="device-mockup__stand" aria-hidden="true">
                  <span />
                  <span />
                </div>
              )}
            </div>
          </div>

          <div ref={infoRef} className="projects__info">
            <span className="projects__category">{activeProject.category}</span>
            <h3 className="projects__title">{activeProject.title}</h3>
            <p className="projects__description">{activeProject.description}</p>

            <ul className="projects__tech" aria-label="Tecnologias utilizadas">
              {activeProject.technologies.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>

            <GlowButton
              as="a"
              href={activeProject.liveUrl}
              target={activeProject.liveUrl !== '#' ? '_blank' : undefined}
              rel="noopener noreferrer"
              variant="primary"
              className="cursor-hover"
            >
              Ver Projeto
            </GlowButton>
          </div>
        </div>

        <div className="projects__nav" role="tablist" aria-label="Selecionar projeto">
          {projects.map((project, index) => (
            <button
              key={project.id}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              className={`projects__nav-item cursor-hover ${index === activeIndex ? 'is-active' : ''}`}
              onClick={() => goTo(index)}
            >
              <span className="projects__nav-index">{String(index + 1).padStart(2, '0')}</span>
              <span className="projects__nav-title">{project.title}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
