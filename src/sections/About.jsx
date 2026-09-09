import LogoMark from '../components/ui/LogoMark';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './About.css';

export default function About() {
  const textRef = useScrollReveal({ variant: 'left' });
  const visualRef = useScrollReveal({ variant: 'right', delay: 0.1 });

  return (
    <section id="sobre" className="about section">
      <div className="container about__grid">
        <div ref={textRef} className="about__text">
          <span className="eyebrow">Sobre mim</span>
          <h2 className="about__title">
            Construindo soluções digitais <span className="text-gradient-electric">modernas e funcionais</span>.
          </h2>
          <p>
            Sou João Felipe, engenheiro de software focado no desenvolvimento de soluções digitais modernas,
            funcionais e intuitivas. Trabalho do planejamento à entrega, buscando unir uma boa experiência de
            uso com um código bem estruturado por trás.
          </p>
          <p>
            Gosto de entender o problema antes de escrever a primeira linha de código — isso evita retrabalho e
            garante que a solução final realmente resolva o que o projeto precisa, seja um site institucional,
            um sistema web ou uma integração entre ferramentas.
          </p>
        </div>

        <div ref={visualRef} className="about__visual" aria-hidden="true">
          <div className="about__visual-glow" />
          <div className="about__visual-frame">
            <LogoMark className="about__logo" />
          </div>
          <div className="about__visual-lines" />
        </div>
      </div>
    </section>
  );
}
