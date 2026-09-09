import SectionHeading from '../components/ui/SectionHeading';
import LogoMark from '../components/ui/LogoMark';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { technologies } from '../data/technologies';
import './Technologies.css';

const RINGS = [0, 1, 2];

export default function Technologies() {
  const orbitRef = useScrollReveal({ variant: 'scale', duration: 1 });

  return (
    <section id="tecnologias" className="technologies section">
      <div className="container">
        <SectionHeading
          eyebrow="Tecnologias"
          title="Um ecossistema técnico sólido"
          description="Ferramentas e linguagens que uso no dia a dia para construir soluções completas, do front-end ao banco de dados."
        />

        <div ref={orbitRef} className="tech-orbit" role="list" aria-label="Tecnologias utilizadas">
          <div className="tech-orbit__core">
            <LogoMark className="tech-orbit__core-logo" />
          </div>

          {RINGS.map((ringIndex) => {
            const items = technologies.filter((tech) => tech.orbit === ringIndex);
            const direction = ringIndex % 2 === 0 ? 'cw' : 'ccw';
            return (
              <div
                key={ringIndex}
                className={`tech-orbit__ring tech-orbit__ring--${ringIndex} tech-orbit__ring--${direction}`}
              >
                {items.map((tech, i) => (
                  <div
                    key={tech.id}
                    className="tech-orbit__item-wrapper"
                    style={{ '--angle': `${(360 / items.length) * i}deg` }}
                  >
                    <div className="tech-orbit__item-anchor">
                      <span
                        role="listitem"
                        className={`tech-orbit__item tech-orbit__item--${direction === 'cw' ? 'ccw' : 'cw'}`}
                      >
                        {tech.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
