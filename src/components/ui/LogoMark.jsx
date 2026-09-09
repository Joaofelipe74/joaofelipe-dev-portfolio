/**
 * Símbolo JF oficial (arquivo enviado por João Felipe, recortado sem
 * qualquer redesenho — apenas remoção do fundo preto). Reutilizado em toda
 * a aplicação: navbar, hero, watermarks, footer, loader.
 *
 * NUNCA gere um novo desenho do símbolo — este componente sempre aponta
 * para os arquivos originais em /public/assets/logo/.
 */
export default function LogoMark({ className = '', priority = false, size = 'md', ...props }) {
  return (
    <picture className={className} {...props}>
      <source srcSet="/assets/logo/jf-emblem.webp" type="image/webp" />
      <img
        src="/assets/logo/jf-emblem.png"
        alt="Símbolo JF — João Felipe Dev"
        loading={priority ? 'eager' : 'lazy'}
        fetchpriority={priority ? 'high' : 'auto'}
        decoding="async"
        data-size={size}
      />
    </picture>
  );
}
