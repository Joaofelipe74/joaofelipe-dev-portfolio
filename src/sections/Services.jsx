import SectionHeading from '../components/ui/SectionHeading';
import ServiceIcon from '../components/ui/ServiceIcon';
import { useTilt } from '../hooks/useTilt';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { services } from '../data/services';
import './Services.css';

function ServiceCard({ service, index }) {
  const { ref, onMouseMove, onMouseLeave } = useTilt({ max: 9, scale: 1.03 });

  return (
    <li
      ref={ref}
      className="service-card tilt-target"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ '--reveal-delay': `${index * 0.06}s` }}
    >
      <div className="service-card__glow" aria-hidden="true" />
      <div className="service-card__icon">
        <ServiceIcon name={service.icon} />
      </div>
      <h3 className="service-card__title">{service.title}</h3>
      <p className="service-card__description">{service.description}</p>
    </li>
  );
}

export default function Services() {
  const listRef = useScrollReveal({ variant: 'scale', stagger: 0.08, duration: 0.7 });

  return (
    <section id="servicos" className="services section section--alt">
      <div className="container">
        <SectionHeading
          eyebrow="O que eu desenvolvo"
          title="Soluções sob medida para cada necessidade digital"
          description="Do primeiro contato à publicação, cada projeto é pensado para funcionar bem — e parecer ainda melhor."
        />

        <ul ref={listRef} className="services__grid">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </ul>
      </div>
    </section>
  );
}
