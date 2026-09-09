import LogoMark from '../components/ui/LogoMark';
import GlowButton from '../components/ui/GlowButton';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { getWhatsAppLink } from '../config/site';
import './CTAFinal.css';

export default function CTAFinal() {
  const contentRef = useScrollReveal({ variant: 'scale', duration: 1 });

  return (
    <section id="contato" className="cta-final section">
      <div className="cta-final__glow" aria-hidden="true" />
      <div className="cta-final__watermark" aria-hidden="true">
        <LogoMark />
      </div>

      <div ref={contentRef} className="container cta-final__content">
        <h2 className="cta-final__title">
          TEM UMA <span className="text-gradient-electric">IDEIA</span>?
          <br />
          VAMOS TRANSFORMÁ-LA EM UM <span className="text-gradient-chrome">PROJETO</span>.
        </h2>
        <GlowButton
          as="a"
          href={getWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          variant="primary"
          className="cursor-hover cta-final__button"
        >
          Solicitar Orçamento
        </GlowButton>
      </div>
    </section>
  );
}
