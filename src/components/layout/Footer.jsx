import LogoMark from '../ui/LogoMark';
import { BRAND, SOCIAL_LINKS } from '../../config/site';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer" id="contato-footer">
      <div className="footer__watermark" aria-hidden="true">
        <LogoMark />
      </div>

      <div className="container footer__inner">
        <div className="footer__brand">
          <LogoMark className="footer__logo" />
          <div>
            <p className="footer__brand-name">{BRAND.fullName}</p>
            <p className="footer__brand-role">{BRAND.role}</p>
          </div>
        </div>

        <nav className="footer__social" aria-label="Redes sociais">
          <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="cursor-hover">
            Instagram
          </a>
          <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="cursor-hover">
            GitHub
          </a>
          <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="cursor-hover">
            WhatsApp
          </a>
        </nav>

        <p className="footer__copy">
          © {BRAND.year} {BRAND.fullName}. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
