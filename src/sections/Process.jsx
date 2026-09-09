import { useEffect, useRef } from 'react';
import SectionHeading from '../components/ui/SectionHeading';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { gsap, ScrollTrigger } from '../utils/gsapSetup';
import { process } from '../data/process';
import './Process.css';

function ProcessStep({ item, index }) {
  const ref = useScrollReveal({ variant: index % 2 === 0 ? 'left' : 'right', delay: 0.05 });

  return (
    <li ref={ref} className="process__step">
      <div className="process__step-marker">
        <span>{item.step}</span>
      </div>
      <div className="process__step-body">
        <h3>{item.title}</h3>
        <p>{item.description}</p>
      </div>
    </li>
  );
}

export default function Process() {
  const timelineRef = useRef(null);
  const lineFillRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      gsap.set(lineFillRef.current, { height: '100%' });
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineFillRef.current,
        { height: '0%' },
        {
          height: '100%',
          ease: 'none',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 75%',
            end: 'bottom 65%',
            scrub: 0.6,
          },
        }
      );
    }, timelineRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.refresh());
    };
  }, [prefersReducedMotion]);

  return (
    <section id="como-funciona" className="process section">
      <div className="container">
        <SectionHeading
          eyebrow="Como funciona"
          title="Um processo claro, do início à evolução"
          description="Transparência em cada etapa — para que você saiba exatamente onde o projeto está a qualquer momento."
        />

        <ol ref={timelineRef} className="process__timeline">
          <div className="process__line" aria-hidden="true">
            <div ref={lineFillRef} className="process__line-fill" />
          </div>
          {process.map((item, index) => (
            <ProcessStep key={item.step} item={item} index={index} />
          ))}
        </ol>
      </div>
    </section>
  );
}
