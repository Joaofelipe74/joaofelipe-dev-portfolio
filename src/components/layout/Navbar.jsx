import { useEffect, useRef, useState } from 'react';
import LogoMark from '../ui/LogoMark';
import GlowButton from '../ui/GlowButton';
import { BRAND, getWhatsAppLink } from '../../config/site';
import './Navbar.css';

const NAV_LINKS = [
  { href: '#inicio', label: 'Início' },
  { href: '#sobre', label: 'Sobre' },
  { href: '#servicos', label: 'Serviços' },
  { href: '#projetos', label: 'Projetos' },
  { href: '#tecnologias', label: 'Tecnologias' },
  { href: '#contato', label: 'Contato' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        <a href="#inicio" className="navbar__brand cursor-hover" aria-label={`${BRAND.fullName} — início`}>
          <LogoMark className="navbar__logo" priority />
          <span className="navbar__brand-text">
            {BRAND.name} <span className="text-gradient-electric">Dev</span>
          </span>
        </a>

        <nav className="navbar__nav navbar__nav--desktop" aria-label="Navegação principal">
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="cursor-hover">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="navbar__actions">
          <GlowButton
            as="a"
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            variant="ghost"
            className="navbar__cta cursor-hover"
          >
            Orçamento
          </GlowButton>

          <button
            type="button"
            className={`navbar__toggle ${menuOpen ? 'is-open' : ''}`}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <nav
        id="mobile-menu"
        ref={menuRef}
        className={`navbar__mobile-menu ${menuOpen ? 'is-open' : ''}`}
        aria-label="Navegação móvel"
        aria-hidden={!menuOpen}
      >
        <ul>
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={handleLinkClick}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
