import './GlowButton.css';

/**
 * Botão base do site — duas variantes:
 *  - "primary": preenchido com gradiente elétrico (CTAs principais)
 *  - "ghost": contorno cromado translúcido (CTAs secundários)
 */
export default function GlowButton({
  as: Component = 'button',
  variant = 'primary',
  className = '',
  children,
  ...props
}) {
  return (
    <Component className={`glow-btn glow-btn--${variant} ${className}`} {...props}>
      <span className="glow-btn__label">{children}</span>
      <span className="glow-btn__glow" aria-hidden="true" />
    </Component>
  );
}
