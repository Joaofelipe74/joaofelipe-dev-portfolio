# João Felipe Dev — Portfólio Profissional

Site profissional (dark premium, futurista, com identidade construída a partir da logo JF) para apresentar trabalho, projetos, serviços e tecnologias, e captar clientes via WhatsApp.

**Stack:** React 18 + Vite · GSAP (ScrollTrigger) para animações de scroll/entrada · Three.js + React Three Fiber para a cena 3D do Hero · CSS puro (com custom properties) para o restante das interações 3D (tilt de cards, mockups de projetos, órbita de tecnologias) — escolhido deliberadamente para manter o site leve; Three.js só é carregado (via `lazy`) quando o Hero realmente precisa dele.

---

## 1. Como rodar o projeto localmente

Pré-requisito: [Node.js](https://nodejs.org) 18 ou superior instalado.

```bash
# 1. Instale as dependências
npm install

# 2. Rode em modo de desenvolvimento (http://localhost:5173)
npm run dev

# 3. Gere a build de produção (gera a pasta /dist)
npm run build

# 4. (opcional) Pré-visualize a build de produção localmente
npm run preview
```

> **Nota:** este projeto foi desenvolvido em um ambiente sem acesso à internet para instalar pacotes, então as dependências não puderam ser instaladas nem o `npm run build` executado automaticamente durante o desenvolvimento. O código foi revisado manualmente (e validado com um bundler/linter) para garantir consistência, mas **rode `npm install && npm run build` no seu ambiente antes de publicar**, e me avise se algum erro aparecer — corrijo rapidamente.

---

## 2. O que você precisa editar antes de publicar

Tudo que é específico do seu negócio está centralizado em **um único arquivo**:

### `src/config/site.js`
- `WHATSAPP_NUMBER` — seu número real, formato internacional só com dígitos (ex: `5511912345678`).
- `WHATSAPP_MESSAGE` — mensagem inicial já preenchida no WhatsApp.
- `SOCIAL_LINKS` — Instagram, GitHub, e-mail.
- `SEO.url` — domínio final do site (usado como referência para OG/canonical).

### `src/data/projects.js`
Adicione, edite ou remova projetos da vitrine sem tocar em nenhum componente — é só editar este array. Veja o exemplo comentado no final do arquivo. Substitua também as imagens em `public/assets/projects/` (os três arquivos atuais são placeholders gerados automaticamente, claramente identificados como tal).

### `index.html`
Há 3 comentários `TODO` para quando o domínio final estiver definido: `canonical`, `og:image`/`og:url` e `twitter:image`.

---

## 3. Estrutura do projeto

```
src/
├── components/
│   ├── layout/     # Navbar, Footer, botão flutuante de WhatsApp, cursor customizado
│   ├── ui/         # Botões, título de seção, logo, ícones, loader de abertura
│   └── three/      # Cena 3D do Hero (Three.js / React Three Fiber)
├── config/
│   └── site.js     # WhatsApp, redes sociais, textos de marca — edite aqui
├── data/
│   ├── projects.js      # Projetos em destaque
│   ├── services.js      # "O que eu desenvolvo"
│   ├── technologies.js  # Tecnologias (órbita)
│   └── process.js       # "Como funciona" (timeline)
├── hooks/          # Mouse, tilt 3D, scroll-reveal (GSAP), device capability, etc.
├── sections/       # Hero, Sobre, Serviços, Tecnologias, Projetos, Processo, CTA final
├── utils/
│   └── gsapSetup.js
├── App.jsx
├── main.jsx
└── index.css       # Design tokens (cores, tipografia, espaçamento) extraídos da logo
```

---

## 4. Decisões de arquitetura e performance

O prompt pedia 3D "onde tecnicamente adequado", sem adicionar bibliotecas por adicionar. Foi assim que dividi:

| Recurso | Tecnologia usada | Por quê |
|---|---|---|
| Símbolo JF de fundo no Hero (flutuante, com parallax e luz dinâmica) | **Three.js / React Three Fiber** | É o único ponto do site que precisa de profundidade real, textura com blending aditivo (glow) e luz reagindo ao mouse — CSS não entrega isso com a mesma qualidade. |
| Tilt 3D dos cards de serviços e dos mockups de projetos | **CSS 3D transforms** (hook `useTilt`) | `perspective` + `rotateX/Y` em CSS já produz o efeito pedido com custo de performance praticamente zero — usar Three.js aqui seria peso desnecessário. |
| Apresentação orbital das tecnologias | **CSS 3D transforms + animação** | Órbitas concêntricas com contra-rotação em CSS puro; leve, sem WebGL, e mantém o texto sempre legível. |
| Animações de entrada por scroll | **GSAP + ScrollTrigger** | Timelines coordenadas (fade, slide, escala, perspectiva) — mais previsível e leve que orquestrar tudo isso manualmente com Intersection Observer. |
| Timeline de "Como funciona" | **GSAP ScrollTrigger (scrub)** | A linha de progresso acompanha o scroll em tempo real. |

**Degradação de performance (mobile-first, não é "desktop encolhido"):**
- `useDeviceCapability` decide, por dispositivo, um de três níveis: `full` (cena 3D completa), `lite` (menos partículas, sem grade técnica) ou `static` (sem WebGL — apenas a logo em CSS com parallax leve seguindo o toque/mouse). A decisão considera `prefers-reduced-motion`, número de núcleos de CPU, memória do dispositivo e modo de economia de dados.
- A cena 3D do Hero é carregada via `React.lazy` (só baixa o código de Three.js quando o Hero realmente vai renderizá-la) e pausa completamente (`frameloop="never"`) quando o Hero sai da viewport.
- Cards de projeto/serviço usam apenas transformações CSS com `will-change`, sem re-render de React a cada frame do mouse.
- Todas as animações respeitam `prefers-reduced-motion: reduce` (Three.js nem chega a ser carregado nesse caso).
- Imagens da logo são servidas em WebP com fallback em PNG via `<picture>`, e o símbolo principal do Hero é pré-carregado (`<link rel="preload">`).

---

## 5. Identidade visual

A paleta (`src/index.css`) foi extraída diretamente do arquivo oficial da logo enviado por você: preto profundo, azul-marinho, azul elétrico (`#2f8bff`), branco e prata/cromado (gradiente `--gradient-chrome`). O arquivo da logo em si **não foi redesenhado** — apenas recortado (remoção do fundo preto para gerar uma versão com transparência) para poder ser reaproveitado em diferentes tamanhos e contextos:

- `brand-assets/jf-logo-full-original.png` — o arquivo exatamente como você enviou, sem nenhuma alteração (fica fora de `public/` para não engordar o site, já que nenhuma tela precisa da peça inteira em alta resolução; use-o para materiais de marca fora do site).
- `public/assets/logo/jf-logo-full.jpg` / `.webp` — a mesma imagem original, apenas comprimida para uso como imagem de Open Graph (prévia ao compartilhar o link).
- `public/assets/logo/jf-emblem.png` / `.webp` (+ versão `-sm` para mobile) — apenas o símbolo "JF", com o fundo removido (usado no Hero 3D, navbar, rodapé, seção de tecnologias e favicons).

---

## 6. Acessibilidade e SEO

- HTML semântico (`header`, `main`, `section`, `footer`, headings em ordem).
- Skip link para o conteúdo principal, `aria-label`s em ícones/botões, foco visível em todos os elementos interativos.
- Cursor customizado e efeitos de tilt são decorativos e não interferem na navegação por teclado.
- `prefers-reduced-motion` respeitado em todas as animações (CSS e GSAP).
- Meta tags de título, descrição, Open Graph, Twitter Card, canonical, favicons e `site.webmanifest` já configurados em `index.html`.

---

## 7. Próximos passos sugeridos

1. Rodar `npm install` e `npm run build` no seu ambiente e revisar o resultado.
2. Substituir o número de WhatsApp e os links sociais em `src/config/site.js`.
3. Substituir as imagens placeholder dos 3 projetos em `public/assets/projects/` pelas screenshots reais.
4. Definir o domínio final e atualizar os 3 `TODO`s de SEO em `index.html`.
5. Publicar (Vercel, Netlify ou qualquer host de arquivos estáticos — a build de produção fica em `/dist`).
