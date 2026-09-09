/**
 * ============================================================================
 * CONFIGURAÇÃO CENTRAL DO SITE — JOÃO FELIPE DEV
 * ============================================================================
 * Este é o ÚNICO arquivo que você precisa editar para:
 *   - trocar o número de WhatsApp;
 *   - trocar a mensagem inicial enviada ao WhatsApp;
 *   - trocar os links de Instagram / GitHub / e-mail;
 *   - trocar textos globais de identidade e metadados.
 *
 * Nada disso está espalhado pelo código — tudo fica aqui.
 * ============================================================================
 */

// ---------------------------------------------------------------------------
// 1. WHATSAPP
// ---------------------------------------------------------------------------
// TODO: substitua pelo número real, formato internacional, SOMENTE DÍGITOS.
// Exemplo para +55 (11) 91234-5678 -> "5511912345678"
export const WHATSAPP_NUMBER = '5519993733611'; // <-- SUBSTITUA AQUI

// Mensagem que já vem preenchida quando alguém clica em um CTA de orçamento.
export const WHATSAPP_MESSAGE =
  'Olá, João! Conheci seu trabalho pelo seu portfólio e gostaria de conversar sobre um projeto.';

// Monta a URL final do WhatsApp (não precisa mexer aqui).
export const getWhatsAppLink = (customMessage) => {
  const message = encodeURIComponent(customMessage || WHATSAPP_MESSAGE);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
};

// ---------------------------------------------------------------------------
// 2. REDES SOCIAIS / LINKS EXTERNOS
// ---------------------------------------------------------------------------
// TODO: substitua pelos seus links reais.
export const SOCIAL_LINKS = {
  instagram: 'https://instagram.com/joaofelipe7.dev', // <-- SUBSTITUA AQUI
  github: 'https://github.com/joaofelipe74', // <-- SUBSTITUA AQUI
  whatsapp: getWhatsAppLink(),
  email: 'contato@joaofelipedev.com.br', // <-- SUBSTITUA AQUI
};

// ---------------------------------------------------------------------------
// 3. IDENTIDADE / MARCA
// ---------------------------------------------------------------------------
export const BRAND = {
  name: 'João Felipe',
  fullName: 'João Felipe Dev',
  role: 'Engenheiro de Software',
  headline: 'Transformando ideias em soluções digitais.',
  subheadline:
    'Desenvolvo soluções digitais modernas — sites, sistemas e integrações — para empresas e projetos que precisam de presença digital sólida e funcional.',
  year: new Date().getFullYear(),
};

// ---------------------------------------------------------------------------
// 4. SEO / METADADOS (usados em componentes que precisam de texto dinâmico)
// ---------------------------------------------------------------------------
export const SEO = {
  title: 'João Felipe Dev | Engenheiro de Software',
  description:
    'Desenvolvimento de sites, sistemas e soluções digitais modernas para empresas e projetos.',
  // TODO: atualize para o domínio real ao publicar
  url: 'https://www.joaofelipedev.com.br/',
};
