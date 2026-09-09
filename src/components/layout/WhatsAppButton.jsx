import { getWhatsAppLink } from '../../config/site';
import './WhatsAppButton.css';

/**
 * Botão flutuante de WhatsApp — desenhado para combinar com a identidade
 * do site (vidro escuro + glow azul + ícone), em vez de parecer um plugin
 * genérico de terceiros.
 */
export default function WhatsAppButton() {
  return (
    <a
      href={getWhatsAppLink()}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-fab cursor-hover"
      aria-label="Conversar no WhatsApp"
    >
      <span className="whatsapp-fab__pulse" aria-hidden="true" />
      <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true" fill="currentColor">
        <path d="M12.02 2C6.5 2 2.02 6.48 2.02 12c0 1.86.5 3.6 1.38 5.1L2 22l5.05-1.33A9.96 9.96 0 0 0 12.02 22C17.55 22 22 17.52 22 12S17.55 2 12.02 2Zm0 18.15c-1.63 0-3.15-.44-4.46-1.2l-.32-.19-3 .79.8-2.93-.2-.3a8.13 8.13 0 0 1-1.27-4.32c0-4.5 3.66-8.15 8.16-8.15 4.5 0 8.16 3.65 8.16 8.15 0 4.5-3.66 8.15-8.16 8.15Zm4.48-6.1c-.24-.12-1.44-.71-1.67-.79-.22-.08-.38-.12-.55.12-.16.24-.63.79-.77.95-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.92-1.18-.71-.63-1.19-1.4-1.33-1.64-.14-.24-.02-.37.1-.5.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.32-.75-1.8-.2-.48-.4-.42-.55-.42h-.47c-.16 0-.42.06-.64.3-.22.24-.85.83-.85 2.02s.87 2.35.99 2.51c.12.16 1.71 2.6 4.13 3.65.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.44-.59 1.64-1.15.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28Z" />
      </svg>
    </a>
  );
}
