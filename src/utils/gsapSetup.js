import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let registered = false;

/**
 * Registra os plugins do GSAP uma única vez em toda a aplicação.
 * Chamado a partir de main.jsx antes de qualquer render.
 */
export function setupGsap() {
  if (registered) return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

export { gsap, ScrollTrigger };
