// ============================================================
// Static Cart & Mailto Checkout Manager (Cues Master Shop)
// - Add to cart (localStorage)
// - Cart page rendering + subtotal
// - Email checkout (mailto)
// - Contact / newsletter forms (mailto)
// - Global button styling fixes (gold buttons, hide broken PayPal skeletons)
// ============================================================

(function () {
  'use strict';

  var ORDER_EMAIL = 'info.elitecues@gmail.com';
  var STORAGE_KEY = 'cm_static_cart';

  // ------------------------------------------------------------
  // Global style fixes: black/invisible buttons
  // ------------------------------------------------------------
  (function injectStyles() {
    var style = document.createElement('style');
    style.id = 'cm-static-fixes';
    style.textContent = [
      '/* hide Shopify payment skeletons (invisible/broken on static site) */',
      '.shopify-payment-button,',
      '.cart__dynamic-checkout-buttons,',
      '.additional-checkout-buttons { display: none !important; }',
      '',
      '/* outline buttons: readable instead of black-on-black / invisible */',
      '.button--secondary {',
      '  background-color: #ffffff !important;',
      '  color: #0a0a0a !important;',
      '  border: 2px solid #c9a84c !important;',
      '  opacity: 1 !important;',
      '}',
      '.button--secondary:after,',
      '.button--secondary:before {',
      '  box-shadow: none !important;',
      '  border: 0 !important;',
      '}',
      '',
      '/* gold brand buttons */',
      '.cm-gold-button,',
      '#checkout,',
      'button.product-form__submit,',
      'button.button--primary.product-form__submit {',
      '  background-color: #c9a84c !important;',
      '  background-image: none !important;',
      '  color: #0a0a0a !important;',
      '  border: 2px solid #c9a84c !important;',
      '  border-radius: 4px !important;',
      '  font-weight: 700 !important;',
      '  letter-spacing: 0.08em !important;',
      '  text-transform: uppercase !important;',
      '  padding: 14px 24px !important;',
      '  font-size: 1.05rem !important;',
      '  min-height: auto !important;',
      '  min-width: auto !important;',
      '  width: 100% !important;',
      '  cursor: pointer !important;',
      '  box-shadow: none !important;',
      '  opacity: 1 !important;',
      '}',
      '#checkout:after,',
      'button.product-form__submit:after,',
      '#checkout:before,',
      'button.product-form__submit:before {',
      '  box-shadow: none !important;',
      '  border: 0 !important;',
      '}',
      '#checkout:hover,',
      '#checkout:focus,',
      'button.product-form__submit:hover,',
      'button.product-form__submit:focus,',
      '.cm-gold-button:hover {',
      '  background-color: #b8923c !important;',
      '  color: #0a0a0a !important;',
      '}',
      '#checkout[disabled] {',
      '  background-color: #c9a84c !important;',
      '  color: #0a0a0a !important;',
      '  opacity: 0.55;',
      '}',
      '',
      '/* ---- design polish ---- */',
      '',
      '/* gold announcement bar */',
      '.announcement-bar {',
      '  background: linear-gradient(90deg, #d4a33c, #c9a84c 45%, #d9b45e) !important;',
      '}',
      '.announcement-bar__message {',
      '  color: #0a0a0a !important;',
      '  font-weight: 700;',
      '  letter-spacing: 0.18em;',
      '}',
      '',
      '/* smooth scrolling + gold selection */',
      'html { scroll-behavior: smooth; }',
      '::selection { background: #c9a84c; color: #0a0a0a; }',
      '',
      '/* nav link hover underline */',
      '.header__menu-item span { position: relative; }',
      '.header__menu-item:not(.header__active-menu-item) span::after {',
      '  content: "";',
      '  position: absolute;',
      '  left: 0; right: 0;',
      '  bottom: -6px;',
      '  height: 2px;',
      '  background: #c9a84c;',
      '  transform: scaleX(0);',
      '  transform-origin: left;',
      '  transition: transform 0.25s ease;',
      '}',
      '.header__menu-item:hover span::after,',
      '.header__menu-item:focus span::after {',
      '  transform: scaleX(1);',
      '}',
      '',
      '/* product card image zoom */',
      '.card__media img, .card__inner img {',
      '  transition: transform 0.45s ease;',
      '}',
      '.card:hover .card__media img,',
      '.card:hover .card__inner img {',
      '  transform: scale(1.05);',
      '}',
      '',
      '/* currency dropdown looks like a button */',
      '.disclosure__button.localization-form__select {',
      '  border: 1px solid rgba(var(--color-foreground), 0.25);',
      '  border-radius: 4px;',
      '  padding: 4px 12px;',
      '}',
      '.disclosure__button.localization-form__select:hover {',
      '  border-color: #c9a84c;',
      '  color: #c9a84c;',
      '}',
      '',
      '/* gold button hover lift */',
      '.cm-gold-button,',
      '#checkout,',
      'button.product-form__submit {',
      '  transition: background-color 0.2s ease, box-shadow 0.2s ease, transform 0.12s ease;',
      '}',
      '.cm-gold-button:hover,',
      '#checkout:hover,',
      'button.product-form__submit:hover {',
      '  transform: translateY(-1px);',
      '  box-shadow: 0 6px 16px rgba(201, 168, 76, 0.35) !important;',
      '}',
      '.cm-gold-button:active,',
      '#checkout:active,',
      'button.product-form__submit:active {',
      '  transform: translateY(0);',
      '}',
      '',
      '/* sticky header (reinforced) */',
      '.shopify-section-header-sticky {',
      '  position: sticky !important;',
      '  top: 0;',
      '  z-index: 5;',
      '}',
      '',
      '/* keep the desktop header + nav on one line */',
      '@media (min-width: 990px) {',
      '  .header { flex-wrap: nowrap !important; }',
      '  .header__heading, .header__heading-link { white-space: nowrap; }',
      '  .list-menu--inline { flex-wrap: nowrap !important; white-space: nowrap; }',
      '  .list-menu--inline li, .list-menu--inline .header__menu-item { white-space: nowrap; }',
      '  .disclosure__button.localization-form__select {',
      '    max-width: 170px;',
      '    overflow: hidden;',
      '    text-overflow: ellipsis;',
      '  }',
      '  .disclosure__button.localization-form__select span {',
      '    display: inline-block;',
      '    max-width: 100%;',
      '    overflow: hidden;',
      '    text-overflow: ellipsis;',
      '    white-space: nowrap;',
      '  }',
      '}',
      '@media (min-width: 990px) and (max-width: 1360px) {',
      '  .list-menu--inline .header__menu-item {',
      '    font-size: 1.3rem;',
      '    padding-left: 1rem;',
      '    padding-right: 1rem;',
      '  }',
      '}',
      '@media (min-width: 990px) and (max-width: 1120px) {',
      '  .list-menu--inline .header__menu-item {',
      '    padding-left: 0.7rem;',
      '    padding-right: 0.7rem;',
      '  }',
      '}',
      '',
      '/* hero box */',
      '.cm-hero-box {',
      '  text-align: center;',
      '  padding: 3.2rem 3rem !important;',
      '  max-width: 660px;',
      '  background: rgba(10, 10, 10, 0.78) !important;',
      '  border: 1px solid rgba(201, 168, 76, 0.35) !important;',
      '  border-radius: 12px;',
      '}',
      '.cm-hero-eyebrow {',
      '  margin: 0 0 0.9rem;',
      '  font-size: 1.2rem;',
      '  letter-spacing: 0.3em;',
      '  text-transform: uppercase;',
      '  color: #c9a84c;',
      '  font-weight: 700;',
      '}',
      '.cm-hero-title {',
      '  margin: 0;',
      '  font-size: clamp(3.2rem, 6vw, 5.2rem);',
      '  font-weight: 900;',
      '  letter-spacing: 0.2em;',
      '  color: #ffffff;',
      '  line-height: 1.05;',
      '}',
      '.cm-hero-sub {',
      '  margin: 1.2rem auto 0;',
      '  max-width: 460px;',
      '  font-size: 1.45rem;',
      '  line-height: 1.65;',
      '  opacity: 0.85;',
      '}',
      '.cm-hero-actions {',
      '  display: flex;',
      '  gap: 1.2rem;',
      '  justify-content: center;',
      '  flex-wrap: wrap;',
      '  margin-top: 2rem;',
      '}',
      '.cm-hero-btn {',
      '  width: auto !important;',
      '  min-width: 180px;',
      '}',
      '@media (max-width: 749px) {',
      '  .cm-hero-box { padding: 2.4rem 1.8rem !important; }',
      '  .cm-hero-title { font-size: 3rem; }',
      '  .cm-hero-sub { font-size: 1.35rem; }',
      '  .cm-hero-btn { min-width: 150px; }',
      '}',
      '',
      '/* header brand wordmark alignment */',
      '.header__heading-link {',
      '  display: inline-flex;',
      '  align-items: center;',
      '  gap: 12px;',
      '}',
      '.header__heading-logo-wrapper {',
      '  width: auto !important;',
      '  display: inline-flex !important;',
      '  align-items: center;',
      '}',
      '.cm-header-brand {',
      '  display: inline-block;',
      '  font-size: clamp(1.6rem, 2.4vw, 2.2rem);',
      '  font-weight: 900;',
      '  letter-spacing: 0.22em;',
      '  line-height: 1;',
      '  color: #c9a84c;',
      '  white-space: nowrap;',
      '  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.12);',
      '}',
      '@media (max-width: 749px) {',
      '  .header__heading-link { gap: 8px; }',
      '  .cm-header-brand { font-size: 1.45rem; letter-spacing: 0.14em; }',
      '}',
      '',
      '/* clear cart button */',
      '.cart-count-bubble {',
      '  background-color: #c9a84c !important;',
      '  color: #0a0a0a !important;',
      '  font-weight: 700;',
      '}',
      '.cart-count-bubble span { color: #0a0a0a; }',
      '@media (min-width: 990px) {',
      '  #cart-icon-bubble {',
      '    position: relative;',
      '    width: auto;',
      '    height: auto;',
      '    min-width: 0;',
      '    gap: 7px;',
      '    padding: 8px 14px;',
      '    border: 1px solid rgba(201, 168, 76, 0.65);',
      '    border-radius: 4px;',
      '    transition: background-color 0.2s ease, border-color 0.2s ease;',
      '  }',
      '  #cart-icon-bubble:hover {',
      '    background-color: rgba(201, 168, 76, 0.14);',
      '    border-color: #c9a84c;',
      '  }',
      '  #cart-icon-bubble .svg-wrapper { width: 2.1rem; height: 2.1rem; }',
      '  .cm-cart-label {',
      '    font-size: 1.1rem;',
      '    font-weight: 800;',
      '    letter-spacing: 0.16em;',
      '    color: #c9a84c;',
      '  }',
      '  #cart-icon-bubble .cart-count-bubble {',
      '    position: static;',
      '    width: auto;',
      '    height: auto;',
      '    min-width: 2rem;',
      '    min-height: 2rem;',
      '    padding: 0 0.55rem;',
      '    border-radius: 999px;',
      '    line-height: 2rem;',
      '    margin-left: 2px;',
      '  }',
      '}',
      '@media (max-width: 989px) {',
      '  .cm-cart-label { display: none; }',
      '  .header { align-items: center; }',
      '  .header__heading, .header > .header__heading-link { justify-self: center; }',
      '  .header__icons { justify-self: end; align-items: center; }',
      '  #cart-icon-bubble { width: 4.4rem; height: 4.4rem; justify-content: center; }',
      '  #cart-icon-bubble .cart-count-bubble { top: 0.2rem; right: 0; }',
      '}',
      '',
      '/* ---- mobile drawer categories ---- */',
      '.cm-drawer-group-title {',
      '  font-size: 1.15rem;',
      '  font-weight: 800;',
      '  letter-spacing: 0.22em;',
      '  text-transform: uppercase;',
      '  color: #c9a84c;',
      '  padding: 1.7rem 2rem 0.5rem;',
      '}',
      '.cm-drawer-group-title:first-child { padding-top: 1rem; }',
      '.cm-drawer-menu .menu-drawer__menu-item {',
      '  padding-top: 0.9rem;',
      '  padding-bottom: 0.9rem;',
      '  border-radius: 6px;',
      '  transition: color 0.15s ease;',
      '}',
      '.cm-drawer-menu .menu-drawer__menu-item:hover { color: #c9a84c; }',
      '',
      '/* ---- popular cues shop page ---- */',
      '.cm-pop-hero { text-align: center; padding: 5.5rem 2rem 2rem; }',
      '.cm-pop-eyebrow { color: #c9a84c; letter-spacing: 0.3em; text-transform: uppercase; font-weight: 700; font-size: 1.15rem; margin: 0 0 0.8rem; }',
      '.cm-pop-hero h1 { margin: 0; font-size: clamp(2.8rem, 5vw, 4.2rem); letter-spacing: -0.02em; line-height: 1.1; }',
      '.cm-pop-accent { display: block; width: 56px; height: 3px; background: #c9a84c; margin: 1.6rem auto 0; border-radius: 2px; }',
      '.cm-pop-hero p { max-width: 660px; margin: 1.4rem auto 0; font-size: 1.5rem; line-height: 1.65; opacity: 0.85; }',
      '.cm-pop-section { max-width: 1160px; margin: 0 auto; padding: 3.2rem 2rem 0; }',
      '.cm-pop-brand-title {',
      '  display: flex;',
      '  align-items: center;',
      '  gap: 1.4rem;',
      '  margin: 0;',
      '  font-size: 1.9rem;',
      '  font-weight: 800;',
      '  letter-spacing: 0.18em;',
      '  text-transform: uppercase;',
      '  color: #c9a84c;',
      '}',
      '.cm-pop-brand-title::after { content: ""; flex: 1; height: 1px; background: rgba(201, 168, 76, 0.35); }',
      '.cm-pop-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.6rem; margin-top: 1.6rem; padding-bottom: 0.5rem; }',
      '.cm-pop-card {',
      '  background: rgba(255, 255, 255, 0.035);',
      '  border: 1px solid rgba(255, 255, 255, 0.08);',
      '  border-radius: 14px;',
      '  overflow: hidden;',
      '  transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;',
      '}',
      '.cm-pop-card:hover { transform: translateY(-5px); border-color: rgba(201, 168, 76, 0.6); box-shadow: 0 18px 44px rgba(0, 0, 0, 0.4); }',
      '.cm-pop-media { display: block; }',
      '.cm-pop-media img { width: 100%; height: auto; display: block; aspect-ratio: 3 / 4; object-fit: cover; }',
      '.cm-pop-body { padding: 1.3rem 1.5rem 1.5rem; text-align: center; }',
      '.cm-pop-name { margin: 0 0 0.5rem; font-size: 1.4rem; font-weight: 600; line-height: 1.35; min-height: 3.8rem; }',
      '.cm-pop-name a { color: #ffffff; text-decoration: none; }',
      '.cm-pop-name a:hover { color: #c9a84c; }',
      '.cm-pop-price { color: #c9a84c; font-weight: 700; font-size: 1.5rem; margin: 0 0 1rem; }',
      '.cm-pop-btn {',
      '  display: inline-block;',
      '  padding: 0.6rem 1.5rem;',
      '  border: 1px solid rgba(201, 168, 76, 0.6);',
      '  color: #c9a84c;',
      '  border-radius: 999px;',
      '  font-size: 1.15rem;',
      '  font-weight: 700;',
      '  letter-spacing: 0.08em;',
      '  text-transform: uppercase;',
      '  text-decoration: none;',
      '  transition: background-color 0.2s ease, color 0.2s ease;',
      '}',
      '.cm-pop-btn:hover { background: #c9a84c; color: #0a0a0a; }',
      '@media (max-width: 989px) { .cm-pop-grid { grid-template-columns: repeat(2, 1fr); } }',
      '@media (max-width: 749px) {',
      '  .cm-pop-hero { padding: 4rem 1.6rem 1.5rem; }',
      '  .cm-pop-section { padding: 2.4rem 1.6rem 0; }',
      '  .cm-pop-grid { grid-template-columns: repeat(2, 1fr); gap: 1rem; }',
      '  .cm-pop-name { font-size: 1.25rem; min-height: 3.4rem; }',
      '  .cm-pop-price { font-size: 1.35rem; }',
      '}',
      '',
      '/* premium typography */',
      'main h1, .cm-contact-hero h1 { line-height: 1.12; }',
      'main h2 { line-height: 1.28; letter-spacing: -0.01em; }',
      '.rte p, .product__description p { line-height: 1.75; }',
      '.price .price-item, .price .money,',
      '.totals__total-value, .totals__total-value .money {',
      '  color: #c9a84c !important;',
      '  font-weight: 700 !important;',
      '}',
      's.price-item, .price--on-sale .price-item--regular { opacity: 0.55 !important; }',
      '.product__title h1, .product__title h2 {',
      '  letter-spacing: -0.01em;',
      '  line-height: 1.15;',
      '  font-weight: 600;',
      '}',
      '.card__heading { letter-spacing: 0.01em; }',
      '.caption-large, .caption { line-height: 1.6; }',
      '',
      '/* mobile cart table layout */',
      '@media (max-width: 749px) {',
      '  .cart-items, .cart-items tbody { display: block; width: 100%; }',
      '  .cart-items thead { display: none; }',
      '  .cart-items .cart-item {',
      '    display: grid;',
      '    grid-template-columns: 80px 1fr;',
      '    grid-template-areas: "media details" "media qty" "totals totals";',
      '    row-gap: 0.9rem;',
      '    column-gap: 1.4rem;',
      '    padding: 1.4rem 0;',
      '  }',
      '  .cart-items .cart-item__media { grid-area: media; padding: 0 !important; }',
      '  .cart-items .cart-item__media img { width: 80px !important; max-width: 80px !important; border-radius: 6px; }',
      '  .cart-items .cart-item__details { grid-area: details; }',
      '  .cart-items .cart-item__quantity { grid-area: qty; }',
      '  .cart-items .cart-item__totals { grid-area: totals; text-align: left !important; }',
      '  .cart-items .cart-item__totals .price { font-size: 1.5rem; }',
      '  .cart-item__name { font-size: 1.45rem; }',
      '}',
      '',
      '/* ---- lighter premium theme ---- */',
      ':root, .color-scheme-1 {',
      '  --color-background: 22, 22, 27 !important;',
      '  --gradient-background: #16161b !important;',
      '  --color-background-contrast: 150, 150, 158 !important;',
      '  --color-secondary-button: 34, 34, 40 !important;',
      '  --color-secondary-button-text: 255, 255, 255 !important;',
      '  --color-link: 201, 168, 76 !important;',
      '  --color-button: 201, 168, 76 !important;',
      '  --color-button-text: 10, 10, 10 !important;',
      '}',
      '.cm-hero-box { background: rgba(24, 24, 30, 0.8) !important; }',
      'body { background-color: #16161b; }',
      '',
      '/* ---- header spacing: brand separated from nav ---- */',
      '@media (min-width: 990px) {',
      '  .header__heading, .header > .header__heading-link {',
      '    position: relative;',
      '    z-index: 2;',
      '    padding-right: 2.4rem;',
      '    margin-right: 1.6rem;',
      '    border-right: 1px solid rgba(201, 168, 76, 0.25);',
      '  }',
      '  .header__inline-menu {',
      '    margin-left: 2.6rem !important;',
      '  }',
      '}',
      '@media (min-width: 990px) and (max-width: 1360px) {',
      '  .header__heading, .header > .header__heading-link { padding-right: 1.4rem; margin-right: 1rem; }',
      '  .header__inline-menu { margin-left: 1.4rem !important; }',
      '}',
      '@media (min-width: 990px) and (max-width: 1180px) {',
      '  .cm-header-brand { font-size: 1.35rem; letter-spacing: 0.12em; }',
      '  .header__heading, .header > .header__heading-link { padding-right: 1rem; margin-right: 0.6rem; }',
      '  .header__inline-menu { margin-left: 1rem !important; }',
      '  .list-menu--inline .header__menu-item {',
      '    font-size: 1.2rem;',
      '    padding-left: 0.6rem;',
      '    padding-right: 0.6rem;',
      '  }',
      '}',
      '',
      '/* ---- premium product page ---- */',
      '.product__text.caption-with-letter-spacing {',
      '  color: #c9a84c;',
      '  letter-spacing: 0.22em;',
      '  text-transform: uppercase;',
      '  font-size: 1.05rem;',
      '  font-weight: 700;',
      '}',
      '.product__title h1, .product__title h2 { font-weight: 700; }',
      '.product__media img {',
      '  border-radius: 14px;',
      '  box-shadow: 0 16px 44px rgba(0, 0, 0, 0.42);',
      '}',
      '.thumbnail-list__item img, .thumbnail img { border-radius: 8px; }',
      '.price.price--large { margin: 0.6rem 0 1rem; }',
      '.price.price--large .price-item,',
      '.price.price--large .price-item .money { font-size: 2.3rem; }',
      '.product__description {',
      '  border-left: 2px solid rgba(201, 168, 76, 0.45);',
      '  padding-left: 1.8rem;',
      '}',
      '.product__description h3 {',
      '  color: #c9a84c;',
      '  letter-spacing: 0.06em;',
      '  text-transform: uppercase;',
      '  font-size: 1.3rem;',
      '}',
      '.product__description li { margin-bottom: 0.6rem; }',
      '.badge { border-radius: 4px; }',
      '.product-form__buttons { margin-top: 1.2rem; }',
      '',
      '/* ---- premium collection (shopping) pages ---- */',
      '.card--card {',
      '  border-radius: 14px;',
      '  overflow: hidden;',
      '  background: linear-gradient(165deg, #23232b 0%, #191920 100%) !important;',
      '  border: 1px solid rgba(255, 255, 255, 0.08) !important;',
      '  --color-foreground: 255, 255, 255 !important;',
      '  box-shadow: 0 8px 26px rgba(0, 0, 0, 0.25);',
      '  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;',
      '}',
      '.card--card.color-scheme-2 {',
      '  background: linear-gradient(165deg, #23232b 0%, #191920 100%) !important;',
      '  --color-foreground: 255, 255, 255 !important;',
      '}',
      '.card--card .card__content { background: transparent; }',
      '.card-wrapper:hover .card--card {',
      '  transform: translateY(-6px);',
      '  border-color: rgba(201, 168, 76, 0.65) !important;',
      '  box-shadow: 0 22px 50px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(201, 168, 76, 0.25);',
      '}',
      '.card__inner .card__media { border-radius: 14px 14px 0 0; }',
      '.card__content { padding: 1.5rem 1.7rem 1.8rem; }',
      '.card__heading, .card__heading a { color: #ffffff; }',
      '.card__heading { font-size: 1.5rem; line-height: 1.3; font-weight: 600; }',
      '.card__information .price { font-size: 1.4rem; }',
      '/* collection list tiles (home) */',
      '.collection-card-wrapper .card__inner {',
      '  border: 1px solid rgba(255, 255, 255, 0.1);',
      '  border-radius: 14px;',
      '  overflow: hidden;',
      '  transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;',
      '}',
      '.collection-card-wrapper:hover .card__inner {',
      '  transform: translateY(-5px);',
      '  border-color: rgba(201, 168, 76, 0.6);',
      '  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.35);',
      '}',
      '.collection-hero__title { font-weight: 800; letter-spacing: -0.01em; }',
      '.collection-hero__title::after {',
      '  content: "";',
      '  display: block;',
      '  width: 48px;',
      '  height: 3px;',
      '  background: #c9a84c;',
      '  margin: 1.2rem auto 0;',
      '  border-radius: 2px;',
      '}',
      '.collection-hero__description { max-width: 660px; margin-left: auto; margin-right: auto; opacity: 0.85; line-height: 1.7; }',
      '.facets-container {',
      '  border: 1px solid rgba(255, 255, 255, 0.09);',
      '  border-radius: 10px;',
      '  padding: 1rem 1.4rem;',
      '}',
      '',
      '/* ---- nav dropdown (More) ---- */',
      '.cm-nav-dropdown { position: relative; }',
      '.cm-dropdown summary {',
      '  list-style: none;',
      '  cursor: pointer;',
      '}',
      '.cm-dropdown summary::-webkit-details-marker { display: none; }',
      '.cm-dropdown summary::marker { content: ""; }',
      '.cm-dropdown-caret {',
      '  display: inline-block;',
      '  margin-left: 0.4rem;',
      '  font-size: 1.1rem;',
      '  color: #c9a84c;',
      '  transition: transform 0.2s ease;',
      '}',
      '.cm-dropdown[open] .cm-dropdown-caret { transform: rotate(180deg); }',
      '.cm-dropdown-panel {',
      '  position: absolute;',
      '  top: calc(100% + 0.4rem);',
      '  left: -1rem;',
      '  min-width: 230px;',
      '  background: #1c1c22;',
      '  border: 1px solid rgba(201, 168, 76, 0.35);',
      '  border-radius: 10px;',
      '  padding: 0.8rem;',
      '  z-index: 30;',
      '  box-shadow: 0 18px 44px rgba(0, 0, 0, 0.45);',
      '  display: flex;',
      '  flex-direction: column;',
      '}',
      '.cm-dropdown-link {',
      '  display: block;',
      '  padding: 0.85rem 1.2rem;',
      '  border-radius: 6px;',
      '  color: #ffffff;',
      '  text-decoration: none;',
      '  font-size: 1.35rem;',
      '  letter-spacing: 0.02em;',
      '  opacity: 0.85;',
      '  transition: background-color 0.15s ease, color 0.15s ease, opacity 0.15s ease;',
      '}',
      '.cm-dropdown-link:hover {',
      '  background: rgba(201, 168, 76, 0.14);',
      '  color: #c9a84c;',
      '  opacity: 1;',
      '}',
      '',
      '/* ---- home page rhythm & polish ---- */',
      '[data-template="index"] [class*="section-template--"] {',
      '  padding-top: 5.5rem !important;',
      '  padding-bottom: 5.5rem !important;',
      '}',
      '@media (max-width: 749px) {',
      '  [data-template="index"] [class*="section-template--"] {',
      '    padding-top: 3.5rem !important;',
      '    padding-bottom: 3.5rem !important;',
      '  }',
      '}',
      '[data-template="index"] .color-scheme-2 {',
      '  --color-background: 22, 22, 27 !important;',
      '  --gradient-background: #1c1c22 !important;',
      '  --color-foreground: 255, 255, 255 !important;',
      '}',
      '[data-template="index"] .rich-text__blocks::before {',
      '  content: "Our Craft";',
      '  display: block;',
      '  margin-bottom: 1.2rem;',
      '  color: #c9a84c;',
      '  letter-spacing: 0.3em;',
      '  text-transform: uppercase;',
      '  font-weight: 700;',
      '  font-size: 1.15rem;',
      '}',
      '[data-template="index"] .rich-text__text p {',
      '  font-size: 1.7rem;',
      '  line-height: 1.85;',
      '  opacity: 0.92;',
      '  max-width: 840px;',
      '  margin-left: auto;',
      '  margin-right: auto;',
      '}',
      '[data-template="index"] .collapsible-content__header::before {',
      '  content: "Frequently Asked Questions";',
      '  display: block;',
      '  font-size: clamp(2.2rem, 4vw, 3rem);',
      '  font-weight: 800;',
      '  letter-spacing: -0.01em;',
      '  margin-bottom: 1.1rem;',
      '}',
      '[data-template="index"] .collapsible-content__header::after {',
      '  content: "";',
      '  display: block;',
      '  width: 48px;',
      '  height: 3px;',
      '  background: #c9a84c;',
      '  margin: 0 auto 2.4rem;',
      '  border-radius: 2px;',
      '}',
      '[data-template="index"] .accordion summary {',
      '  font-size: 1.55rem;',
      '  font-weight: 600;',
      '}',
      '[data-template="index"] .accordion summary:hover,',
      '[data-template="index"] .accordion summary:focus {',
      '  color: #c9a84c;',
      '}',
      '',
      '/* ---- trust bar ---- */',
      '.cm-trust-bar {',
      '  display: grid;',
      '  grid-template-columns: repeat(4, 1fr);',
      '  gap: 1.4rem;',
      '  max-width: 1200px;',
      '  margin: 0 auto;',
      '  padding: 4.5rem 2rem 0;',
      '}',
      '.cm-trust-item {',
      '  text-align: center;',
      '  padding: 2rem 1.4rem;',
      '  background: rgba(255, 255, 255, 0.035);',
      '  border: 1px solid rgba(255, 255, 255, 0.08);',
      '  border-radius: 12px;',
      '}',
      '.cm-trust-icon {',
      '  display: inline-flex;',
      '  align-items: center;',
      '  justify-content: center;',
      '  width: 52px;',
      '  height: 52px;',
      '  border-radius: 50%;',
      '  background: rgba(201, 168, 76, 0.14);',
      '  color: #c9a84c;',
      '  margin-bottom: 1.1rem;',
      '}',
      '.cm-trust-item strong { display: block; font-size: 1.45rem; letter-spacing: 0.03em; margin-bottom: 0.4rem; }',
      '.cm-trust-item span:last-child { font-size: 1.3rem; opacity: 0.7; line-height: 1.5; }',
      '@media (max-width: 989px) { .cm-trust-bar { grid-template-columns: repeat(2, 1fr); } }',
      '@media (max-width: 749px) { .cm-trust-bar { grid-template-columns: 1fr; padding: 3rem 1.6rem 0; } }',
      '',
      '/* ---- cue of the month spotlight ---- */',
      '.cm-spotlight { padding: 5.5rem 2rem; }',
      '.cm-spotlight-grid {',
      '  display: grid;',
      '  grid-template-columns: 1fr 1.1fr;',
      '  gap: 4rem;',
      '  align-items: center;',
      '  max-width: 1100px;',
      '  margin: 0 auto;',
      '}',
      '.cm-spotlight-media { position: relative; }',
      '.cm-spotlight-media img {',
      '  border-radius: 16px;',
      '  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.5);',
      '  width: 100%;',
      '  height: auto;',
      '  display: block;',
      '}',
      '.cm-spotlight-badge {',
      '  position: absolute;',
      '  top: 1.4rem;',
      '  left: 1.4rem;',
      '  background: #c9a84c;',
      '  color: #0a0a0a;',
      '  font-weight: 800;',
      '  letter-spacing: 0.12em;',
      '  text-transform: uppercase;',
      '  font-size: 1.1rem;',
      '  padding: 0.55rem 1.2rem;',
      '  border-radius: 999px;',
      '}',
      '.cm-spotlight-eyebrow {',
      '  color: #c9a84c;',
      '  letter-spacing: 0.3em;',
      '  text-transform: uppercase;',
      '  font-weight: 700;',
      '  font-size: 1.15rem;',
      '  margin: 0 0 0.8rem;',
      '}',
      '.cm-spotlight-content h2 { font-size: clamp(2.6rem, 4vw, 3.6rem); letter-spacing: -0.02em; line-height: 1.1; margin: 0 0 0.8rem; }',
      '.cm-spotlight-price { color: #c9a84c; font-weight: 700; font-size: 2rem; margin: 0 0 1.2rem; }',
      '.cm-spotlight-desc { opacity: 0.85; line-height: 1.75; font-size: 1.5rem; margin: 0 0 1.6rem; }',
      '.cm-spotlight-specs { list-style: none; padding: 0; margin: 0 0 2rem; display: flex; flex-wrap: wrap; gap: 0.7rem; }',
      '.cm-spotlight-specs li {',
      '  background: rgba(201, 168, 76, 0.12);',
      '  color: #c9a84c;',
      '  border: 1px solid rgba(201, 168, 76, 0.3);',
      '  padding: 0.5rem 1.1rem;',
      '  border-radius: 999px;',
      '  font-size: 1.25rem;',
      '}',
      '.cm-spotlight-actions .cm-gold-button { width: auto !important; display: inline-flex; min-width: 200px; }',
      '@media (max-width: 989px) { .cm-spotlight-grid { grid-template-columns: 1fr; gap: 2.4rem; } }',
      '',
      '/* ---- testimonials ---- */',
      '.cm-testimonials { padding: 5.5rem 2rem; }',
      '.cm-testimonials-head { text-align: center; margin-bottom: 2.6rem; }',
      '.cm-testimonials-eyebrow {',
      '  color: #c9a84c;',
      '  letter-spacing: 0.3em;',
      '  text-transform: uppercase;',
      '  font-weight: 700;',
      '  font-size: 1.15rem;',
      '  margin: 0 0 0.8rem;',
      '}',
      '.cm-testimonials-head h2 { margin: 0; font-size: clamp(2.4rem, 4vw, 3.2rem); letter-spacing: -0.02em; }',
      '.cm-testimonials-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.6rem; max-width: 1100px; margin: 0 auto; }',
      '.cm-testimonial-card {',
      '  background: rgba(255, 255, 255, 0.035);',
      '  border: 1px solid rgba(255, 255, 255, 0.08);',
      '  border-radius: 14px;',
      '  padding: 2.2rem;',
      '  transition: border-color 0.25s ease, transform 0.25s ease;',
      '}',
      '.cm-testimonial-card:hover { border-color: rgba(201, 168, 76, 0.5); transform: translateY(-4px); }',
      '.cm-stars { color: #c9a84c; letter-spacing: 0.2em; font-size: 1.4rem; margin-bottom: 1rem; }',
      '.cm-testimonial-card p { font-size: 1.45rem; line-height: 1.7; opacity: 0.88; margin: 0 0 1.4rem; }',
      '.cm-testimonial-card strong { display: block; font-size: 1.35rem; }',
      '.cm-testimonial-card .cm-loc { display: block; font-size: 1.25rem; opacity: 0.6; margin-top: 0.2rem; }',
      '@media (max-width: 989px) { .cm-testimonials-grid { grid-template-columns: 1fr; } }',
      '',
      '/* ---- product card quick view ---- */',
      '.card__media { position: relative; }',
      '.cm-quick-view {',
      '  position: absolute;',
      '  left: 50%;',
      '  bottom: 1.4rem;',
      '  transform: translate(-50%, 10px);',
      '  background: rgba(10, 10, 10, 0.85);',
      '  color: #c9a84c;',
      '  border: 1px solid rgba(201, 168, 76, 0.6);',
      '  padding: 0.8rem 1.6rem;',
      '  border-radius: 999px;',
      '  font-size: 1.2rem;',
      '  font-weight: 700;',
      '  letter-spacing: 0.1em;',
      '  text-transform: uppercase;',
      '  text-decoration: none;',
      '  opacity: 0;',
      '  transition: opacity 0.25s ease, transform 0.25s ease, background-color 0.2s ease, color 0.2s ease;',
      '  z-index: 3;',
      '  pointer-events: none;',
      '  white-space: nowrap;',
      '}',
      '.card-wrapper:hover .cm-quick-view,',
      '.card-wrapper:focus-within .cm-quick-view {',
      '  opacity: 1;',
      '  transform: translate(-50%, 0);',
      '  pointer-events: auto;',
      '}',
      '.cm-quick-view:hover { background: #c9a84c; color: #0a0a0a; }',
      '',
      '/* ---- mobile optimizations ---- */',
      'body { overflow-x: clip; }',
      '* { -webkit-tap-highlight-color: rgba(201, 168, 76, 0.25); }',
      '@media (max-width: 749px) {',
      '  .announcement-bar__message { letter-spacing: 0.08em; font-size: 1.1rem; }',
      '  .cm-hero-actions { gap: 0.9rem; }',
      '  .cm-hero-btn { min-width: 0; flex: 1 1 150px; }',
      '  .cm-quick-view { padding: 0.55rem 1.1rem; font-size: 1.05rem; bottom: 1rem; }',
      '  .cm-spotlight { padding: 3.5rem 1.6rem; }',
      '  .cm-spotlight-badge { top: 1rem; left: 1rem; font-size: 1rem; padding: 0.45rem 1rem; }',
      '  .cm-testimonials { padding: 3.5rem 1.6rem; }',
      '  .cm-footer-brand p:first-child { font-size: 1.9rem; }',
      '  .product__description { padding-left: 1.4rem; }',
      '  .cart-item__quantity .cart-item__remove {',
      '    min-width: 4.4rem;',
      '    min-height: 4.4rem;',
      '  }',
      '}',
      '',
      '/* ---- search page ---- */',
      '.cm-search-box { display: flex; gap: 1rem; max-width: 580px; margin: 2.2rem auto 0; }',
      '.cm-search-input {',
      '  flex: 1;',
      '  min-width: 0;',
      '  background: rgba(255, 255, 255, 0.06);',
      '  border: 1px solid rgba(255, 255, 255, 0.16);',
      '  border-radius: 8px;',
      '  padding: 1rem 1.3rem;',
      '  color: #ffffff;',
      '  font-size: 1.5rem;',
      '  transition: border-color 0.2s ease, box-shadow 0.2s ease;',
      '}',
      '.cm-search-input::placeholder { color: rgba(255, 255, 255, 0.4); }',
      '.cm-search-input:focus { outline: none; border-color: #c9a84c; box-shadow: 0 0 0 3px rgba(201, 168, 76, 0.22); }',
      '.cm-search-btn { white-space: nowrap; }',
      '.cm-search-meta { font-size: 1.3rem; opacity: 0.8; margin-top: 1.4rem; letter-spacing: 0.04em; }',
      '.cm-search-empty {',
      '  grid-column: 1 / -1;',
      '  text-align: center;',
      '  padding: 3.5rem 1.5rem;',
      '  font-size: 1.5rem;',
      '  opacity: 0.85;',
      '  line-height: 1.7;',
      '}',
      '.cm-pop-brand { color: rgba(255, 255, 255, 0.55); font-size: 1.05rem; letter-spacing: 0.22em; text-transform: uppercase; margin: 0 0 0.5rem; }',
      '@keyframes cm-card-in {',
      '  from { opacity: 0; transform: translateY(14px); }',
      '  to { opacity: 1; transform: none; }',
      '}',
      '.cm-pop-card { animation: cm-card-in 0.45s ease both; }',
      '@media (prefers-reduced-motion: reduce) {',
      '  .cm-pop-card { animation: none; }',
      '}',
      '',
      '/* ---- cart + checkout animations ---- */',
      '@keyframes cm-bump {',
      '  0% { transform: scale(1); }',
      '  35% { transform: scale(1.45); }',
      '  70% { transform: scale(0.92); }',
      '  100% { transform: scale(1); }',
      '}',
      '.cart-count-bubble.cm-bump { animation: cm-bump 0.45s ease; }',
      '@keyframes cm-row-in {',
      '  from { opacity: 0; transform: translateX(-14px); }',
      '  to { opacity: 1; transform: none; }',
      '}',
      '.cart-items .cart-item {',
      '  animation: cm-row-in 0.35s ease both;',
      '  animation-delay: calc(var(--i, 0) * 60ms);',
      '}',
      '.cart-items .cart-item.cm-removing {',
      '  opacity: 0 !important;',
      '  transform: translateX(30px);',
      '  transition: opacity 0.28s ease, transform 0.28s ease;',
      '  animation: none !important;',
      '}',
      '.cm-gold-button { transition: transform 0.15s ease, background-color 0.2s ease, color 0.2s ease; }',
      '.cm-gold-button:active { transform: scale(0.97); }',
      '@media (prefers-reduced-motion: reduce) {',
      '  .cart-count-bubble.cm-bump { animation: none; }',
      '  .cart-items .cart-item { animation: none; }',
      '  .cart-items .cart-item.cm-removing { transition: none; }',
      '}',
      '',
      '/* scroll reveal animations */',
      '.cm-reveal {',
      '  opacity: 0;',
      '  transform: translateY(26px);',
      '  transition: opacity 0.7s ease, transform 0.7s ease;',
      '}',
      '.cm-reveal.cm-reveal-visible {',
      '  opacity: 1;',
      '  transform: none;',
      '}',
      '@media (prefers-reduced-motion: reduce) {',
      '  .cm-reveal {',
      '    opacity: 1;',
      '    transform: none;',
      '    transition: none;',
      '  }',
      '}'
    ].join('\n');
    document.head.appendChild(style);
  })();

  // ------------------------------------------------------------
  // Cart storage helpers
  // ------------------------------------------------------------
  function readCart() {
    try {
      var data = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (Array.isArray(data)) return data;
    } catch (e) { /* ignore */ }
    return [];
  }

  var cart = readCart();

  function saveCart() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(cart)); } catch (e) { /* ignore */ }
  }

  function getCurrency() {
    try { return localStorage.getItem('cm_currency') || 'USD'; } catch (e) { return 'USD'; }
  }

  function formatMoney(phpAmount) {
    var currency = getCurrency();
    if (
      typeof convertPrice === 'function' &&
      typeof formatNumber === 'function' &&
      typeof CURRENCY_SYMBOLS !== 'undefined'
    ) {
      var converted = convertPrice(phpAmount, currency);
      return CURRENCY_SYMBOLS[currency] + formatNumber(converted, currency);
    }
    // Fallback (currency-switcher not loaded): USD conversion
    return '$' + (Number(phpAmount) * 0.0174).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  function escapeHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // ------------------------------------------------------------
  // Cart operations
  // ------------------------------------------------------------
  function addToCart(item) {
    item.price = Number(item.price) || 0;
    item.quantity = Math.max(1, Number(item.quantity) || 1);
    var existing = cart.find(function (i) { return i.title === item.title; });
    if (existing) {
      existing.quantity += item.quantity;
      existing.price = item.price;
      existing.image = item.image || existing.image;
      existing.url = item.url || existing.url;
    } else {
      cart.push(item);
    }
    saveCart();
    updateCartCount();
  }

  function removeFromCart(index) {
    if (index >= 0 && index < cart.length) {
      cart.splice(index, 1);
      saveCart();
      renderCart();
      updateCartCount();
    }
  }

  // ------------------------------------------------------------
  // Header cart count bubble
  // ------------------------------------------------------------
  function updateCartCount() {
    var bubble = document.getElementById('cart-icon-bubble');
    if (!bubble) return;

    var count = cart.reduce(function (total, item) {
      return total + (Number(item.quantity) || 0);
    }, 0);

    var countDiv = bubble.querySelector('.cart-count-bubble');

    if (count > 0) {
      if (countDiv) {
        var ariaSpan = countDiv.querySelector('span[aria-hidden="true"]');
        var srSpan = countDiv.querySelector('.visually-hidden');
        if (ariaSpan) ariaSpan.textContent = count;
        if (srSpan) srSpan.textContent = count + ' items';
      } else {
        var el = document.createElement('div');
        el.className = 'cart-count-bubble';
        el.innerHTML =
          '<span aria-hidden="true">' + count + '</span>' +
          '<span class="visually-hidden">' + count + ' items</span>';
        bubble.appendChild(el);
        countDiv = el;
      }
      countDiv.classList.remove('cm-bump');
      void countDiv.offsetWidth; // restart animation
      countDiv.classList.add('cm-bump');
    } else if (countDiv) {
      countDiv.parentNode.removeChild(countDiv);
    }
  }

  // ------------------------------------------------------------
  // Cart page
  // ------------------------------------------------------------
  function isCartPage() {
    return /(^|\/)cart(\.html)?$/.test(window.location.pathname);
  }

  function renderCart() {
    if (!isCartPage()) return;

    var cartItemsEl = document.querySelector('cart-items');
    var contents = document.querySelector('.js-contents');
    var mainFooter = document.getElementById('main-cart-footer');
    if (!cartItemsEl || !contents) return;

    if (cart.length === 0) {
      cartItemsEl.classList.add('is-empty');
      if (mainFooter) mainFooter.classList.add('is-empty');
      contents.innerHTML = '';
      return;
    }

    cartItemsEl.classList.remove('is-empty');
    if (mainFooter) mainFooter.classList.remove('is-empty');

    var html =
      '<table class="cart-items"><thead><tr>' +
      '<th class="caption-with-letter-spacing" colspan="2" scope="col">Product</th>' +
      '<th class="caption-with-letter-spacing" colspan="1" scope="col">Quantity</th>' +
      '<th class="caption-with-letter-spacing right" colspan="1" scope="col">Total</th>' +
      '</tr></thead><tbody>';

    var subtotal = 0;

    cart.forEach(function (item, index) {
      var price = Number(item.price) || 0;
      var qty = Number(item.quantity) || 1;
      var itemTotal = price * qty;
      subtotal += itemTotal;
      var url = item.url || '#';
      var imgSrc = '';
      if (item.image) {
        try { imgSrc = new URL(item.image, document.baseURI).href; } catch (e) { imgSrc = item.image; }
      }

      html +=
        '<tr class="cart-item" style="border-bottom: 1px solid rgba(18,18,18,.12); --i:' + index + '">' +
        '<td class="cart-item__media" style="padding-top:15px; padding-bottom:15px;">' +
        (item.image
          ? '<img src="' + escapeHtml(imgSrc) + '" alt="' + escapeHtml(item.title) + '" width="100" style="max-width:100px; height:auto; border-radius:4px;">'
          : '') +
        '</td>' +
        '<td class="cart-item__details">' +
        '<a href="' + escapeHtml(url) + '" class="cart-item__name h4 break">' + escapeHtml(item.title) + '</a>' +
        '<div class="cart-item__price-wrapper">' +
        '<span class="price price--end" data-php-price="' + price + '">' + formatMoney(price) + '</span>' +
        '</div>' +
        '</td>' +
        '<td class="cart-item__quantity">' +
        '<div style="display:flex; align-items:center; gap:15px;">' +
        '<span style="font-size:1.2rem; font-weight:bold;">x' + qty + '</span>' +
        '<button type="button" class="button button--tertiary cart-item__remove" data-index="' + index + '"' +
        ' aria-label="Remove ' + escapeHtml(item.title) + '"' +
        ' style="padding:5px 10px; min-width:auto; min-height:auto; font-size:1.2rem; border:1px solid rgba(18,18,18,.3);">' +
        '\uD83D\uDDD1' +
        '</button>' +
        '</div>' +
        '</td>' +
        '<td class="cart-item__totals right">' +
        '<div class="cart-item__price-wrapper">' +
        '<span class="price price--end" data-php-price="' + itemTotal + '">' + formatMoney(itemTotal) + '</span>' +
        '</div>' +
        '</td>' +
        '</tr>';
    });

    html += '</tbody></table>';
    contents.innerHTML = html;

    var subtotalEl = document.querySelector('.totals__total-value');
    if (subtotalEl) {
      subtotalEl.setAttribute('data-php-price', subtotal);
      subtotalEl.innerHTML = '<span class="money">' + formatMoney(subtotal) + '</span>';
    }

    setupCheckoutButton();

    // Re-apply the selected currency to all tagged prices (uses currency-switcher.js)
    if (typeof applyPrices === 'function' && typeof selectedCurrency !== 'undefined') {
      applyPrices(selectedCurrency);
    }
  }

  function setupCheckoutButton() {
    var checkoutBtn = document.getElementById('checkout');
    if (!checkoutBtn) return;

    checkoutBtn.disabled = false;
    checkoutBtn.type = 'button';
    checkoutBtn.classList.add('cm-gold-button');
    checkoutBtn.innerHTML = '\u2709 Checkout via Email';

    if (checkoutBtn.dataset.cmBound) return;
    checkoutBtn.dataset.cmBound = '1';

    checkoutBtn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();

      var currency = getCurrency();
      var totalItems = 0;
      var grandTotal = 0;

      var orderText = 'Hello,\n\nI would like to place an order for the following items from my cart:\n\n';
      cart.forEach(function (item) {
        var price = Number(item.price) || 0;
        var qty = Number(item.quantity) || 1;
        var lineTotal = price * qty;
        totalItems += qty;
        grandTotal += lineTotal;
        orderText += '- ' + item.title + ' (x' + qty + ')\n';
        orderText += '  Unit Price: ' + formatMoney(price) + '\n';
        orderText += '  Line Total: ' + formatMoney(lineTotal) + '\n';
        orderText += '  Link: ' + (item.url || '') + '\n\n';
      });
      orderText += 'Total Items: ' + totalItems + '\n';
      orderText += 'Grand Total: ' + formatMoney(grandTotal) + ' (' + currency + ')\n\n';
      orderText += 'Please let me know the next steps for payment and shipping.\n\n';
      orderText += 'My Details:\nName: \nPhone: \nAddress: \n';

      window.location.href =
        'mailto:' + ORDER_EMAIL +
        '?subject=' + encodeURIComponent('New Cart Order Request - ' + totalItems + ' item(s)') +
        '&body=' + encodeURIComponent(orderText);
    });
  }

  // ------------------------------------------------------------
  // Add-to-cart forms (product pages)
  // ------------------------------------------------------------
  function getProductTitle() {
    var el = document.querySelector('.product__title h1') ||
             document.querySelector('a.product__title h2') ||
             document.querySelector('.product__title');
    if (el) {
      var title = (el.textContent || '').trim().split('|')[0].trim();
      if (title) return title;
    }
    var main = document.querySelector('main h1');
    if (main) return main.textContent.trim().split('|')[0].trim();
    return document.title.split('|')[0].trim() || document.title;
  }

  function getProductPrice() {
    var candidates = document.querySelectorAll(
      '.price-item--sale, .price-item--sale .money, .price-item--regular, .price-item--regular .money, .price .money, [data-php-price]'
    );
    for (var i = 0; i < candidates.length; i++) {
      var el = candidates[i];
      if (el.dataset && el.dataset.phpPrice) {
        var fromData = parseFloat(el.dataset.phpPrice);
        if (!isNaN(fromData) && fromData > 0) return fromData;
      }
      var cleaned = (el.textContent || '').replace(/[^\d.]/g, '');
      var val = parseFloat(cleaned);
      if (!isNaN(val) && val > 0) return val;
    }
    return 0;
  }

  function getProductImage() {
    // Return an absolute URL so it works from the cart page regardless of
    // the page the item was added from (http or file protocol).
    var og = document.querySelector('meta[property="og:image"], meta[property="og:image:secure_url"]');
    if (og && og.content) {
      try { return new URL(og.content, document.baseURI).href; } catch (e) { return og.content; }
    }
    var img = document.querySelector('.product__media img, .product__media-wrapper img, .product__info-wrapper img');
    if (img) {
      var raw = img.getAttribute('src') || img.src;
      try { return new URL(raw, document.baseURI).href; } catch (e) { return img.src; }
    }
    return '';
  }

  function getPageUrl() {
    return window.location.href.split('#')[0];
  }

  function styleAddButton(btn) {
    if (!btn) return;
    btn.classList.add('cm-gold-button');
    var span = btn.querySelector('span');
    if (span && /add to cart/i.test(span.textContent)) span.textContent = 'Add to Cart';
  }

  function setupAddToCartForms() {
    var forms = document.querySelectorAll('form[action*="/cart/add"]');
    forms.forEach(function (form) {
      var btn = form.querySelector('button[type="submit"], button[name="add"]');
      styleAddButton(btn);

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();

        var qty = 1;
        var qtyInput = form.querySelector('input[name="quantity"]');
        if (qtyInput) qty = Math.max(1, parseInt(qtyInput.value, 10) || 1);

        addToCart({
          title: getProductTitle(),
          price: getProductPrice(),
          image: getProductImage(),
          quantity: qty,
          url: getPageUrl()
        });

        var submitBtn = form.querySelector('button[type="submit"], button[name="add"]');
        if (submitBtn) {
          var span = submitBtn.querySelector('span');
          var target = span || submitBtn;
          target.textContent = '\u2713 Enter Cart';
          submitBtn.style.backgroundColor = '#25d366';
          submitBtn.style.borderColor = '#25d366';
          submitBtn.style.color = '#0a0a0a';
          if (!submitBtn.dataset.cmEnterCartBound) {
            submitBtn.dataset.cmEnterCartBound = '1';
            var prefix = '';
            if (window.location.pathname.split('/').filter(Boolean).length > 1) {
              prefix = '../';
            }
            submitBtn.addEventListener('click', function (e2) {
              if (submitBtn.dataset.cmEnterCartBound !== '2') return;
              e2.preventDefault();
              e2.stopImmediatePropagation();
              window.location.href = prefix + 'cart.html';
            });
          }
          submitBtn.dataset.cmEnterCartBound = '2';
        }
      });
    });
  }

  // ------------------------------------------------------------
  // Contact / newsletter forms -> mailto
  // ------------------------------------------------------------
  function setupContactForms() {
    var forms = document.querySelectorAll('form[action*="contact"]');
    forms.forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();

        var isNewsletter = form.id === 'ContactFooter' ||
                           (form.querySelector('input[name="contact[tags]"]') &&
                            (form.querySelector('input[name="contact[tags]"]').value || '').indexOf('newsletter') !== -1);

        var subject = isNewsletter
          ? 'New Newsletter Subscription'
          : 'New Contact Request from Website';

        var bodyText = isNewsletter
          ? 'Hello,\n\nPlease subscribe me to your newsletter.\n\n'
          : 'Hello,\n\nI am reaching out regarding:\n\n';

        form.querySelectorAll('input, textarea, select').forEach(function (input) {
          var name = input.name || '';
          if (!name || name === 'utf8' || name === 'form_type' || name === '_method' || name === 'return_to') return;
          var value = (input.value || '').trim();
          if (!value) return;
          var label = name.replace('contact[', '').replace(']', '');
          bodyText += label + ': ' + value + '\n';
        });

        bodyText += '\n\nMy Details:\nName: \nPhone: \nAddress: \n';

        window.location.href =
          'mailto:' + ORDER_EMAIL +
          '?subject=' + encodeURIComponent(subject) +
          '&body=' + encodeURIComponent(bodyText);
      });
    });
  }

  // ------------------------------------------------------------
  // Scroll reveal animations (fade-in on scroll)
  // Skips elements already animated by the theme's scroll-trigger.
  // ------------------------------------------------------------
  function initScrollReveal() {
    var candidates = document.querySelectorAll(
      'main img, main h2, .product__info-container > *, .product__description > *, .rte > p, .rte > h2'
    );
    var els = [];
    candidates.forEach(function (el) {
      if (el.closest('.scroll-trigger')) return; // theme handles these
      if (el.offsetParent === null) return;      // hidden element
      el.classList.add('cm-reveal');
      els.push(el);
    });
    if (!els.length) return;

    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('cm-reveal-visible'); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('cm-reveal-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

    els.forEach(function (el) { io.observe(el); });
  }

  // ------------------------------------------------------------
  // Search: route the Dawn /search form to the static search page
  // ------------------------------------------------------------
  function setupSearchForms() {
    var prefix = '';
    if (window.location.pathname.split('/').filter(Boolean).length > 1) {
      prefix = '../';
    }
    document.addEventListener('submit', function (e) {
      var form = e.target;
      if (!form || form.tagName !== 'FORM') return;
      var action = form.getAttribute('action') || '';
      if (action.indexOf('/search') !== 0) return;
      e.preventDefault();
      e.stopImmediatePropagation();
      var input = form.querySelector('input[name="q"]');
      var q = (input && input.value || '').trim();
      window.location.href = prefix + 'search.html?q=' + encodeURIComponent(q);
    }, true);
  }

  // ------------------------------------------------------------
  // Clear cart button: add a "CART" label next to the icon
  // ------------------------------------------------------------
  function enhanceCartLink() {
    var link = document.getElementById('cart-icon-bubble');
    if (!link || link.querySelector('.cm-cart-label')) return;
    var label = document.createElement('span');
    label.className = 'cm-cart-label';
    label.textContent = 'CART';
    link.appendChild(label);
  }

  // ------------------------------------------------------------
  // Product cards: quick view pill (links to the product page)
  // ------------------------------------------------------------
  function initQuickView() {
    document.querySelectorAll('.product-card-wrapper').forEach(function (wrapper) {
      if (wrapper.querySelector('.cm-quick-view')) return;
      var link = wrapper.querySelector('a.full-unstyled-link[href], a[href*=".html"]');
      if (!link) return;
      var media = wrapper.querySelector('.card__media');
      if (!media) return;
      var btn = document.createElement('a');
      btn.className = 'cm-quick-view';
      btn.textContent = 'Quick View';
      btn.setAttribute('href', link.getAttribute('href'));
      btn.setAttribute('aria-label', 'Quick view ' + (link.textContent || '').trim());
      media.appendChild(btn);
    });
  }

  // ------------------------------------------------------------
  // Mobile drawer: group links into categories
  // ------------------------------------------------------------
  function initDrawerCategories() {
    var drawerNav = document.querySelector('header-drawer nav ul');
    if (!drawerNav || drawerNav.querySelector('.cm-drawer-group-title')) return;

    var links = {};
    drawerNav.querySelectorAll('a[href]').forEach(function (a) {
      if (a.id) links[a.id] = a;
    });

    var groups = [
      {
        title: 'Shop',
        ids: ['HeaderDrawer-home', 'HeaderDrawer-popular-cues', 'HeaderDrawer-on-hand-cues', 'HeaderDrawer-shafts', 'HeaderDrawer-accessories', 'HeaderDrawer-more-all-cues']
      },
      {
        title: 'Collections',
        ids: ['HeaderDrawer-more-calma-collection', 'HeaderDrawer-more-classic-collection', 'HeaderDrawer-more-dragon-collection', 'HeaderDrawer-more-exotic-woods', 'HeaderDrawer-more-resin-art']
      },
      {
        title: 'Equipment',
        ids: ['HeaderDrawer-more-chalk', 'HeaderDrawer-more-cue-tips', 'HeaderDrawer-more-gloves']
      },
      {
        title: 'Support',
        ids: ['HeaderDrawer-more-shipping-policy', 'HeaderDrawer-contact-us']
      }
    ];

    var ul = document.createElement('ul');
    ul.className = 'list-menu cm-drawer-menu';

    groups.forEach(function (group) {
      var title = document.createElement('li');
      title.className = 'cm-drawer-group-title';
      title.textContent = group.title;
      ul.appendChild(title);

      group.ids.forEach(function (id) {
        var original = links[id];
        if (!original) return;
        var li = document.createElement('li');
        var clone = original.cloneNode(true);
        clone.removeAttribute('id');
        li.appendChild(clone);
        ul.appendChild(li);
      });
    });

    drawerNav.innerHTML = '';
    drawerNav.appendChild(ul);
  }

  // ------------------------------------------------------------
  // Init
  // ------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', function () {
    updateCartCount();
    renderCart();
    setupAddToCartForms();
    setupContactForms();
    setupSearchForms();
    initScrollReveal();
    enhanceCartLink();
    initQuickView();
    initDrawerCategories();

    // Cart page: remove item buttons (delegated, with exit animation)
    document.addEventListener('click', function (e) {
      var btn = e.target && e.target.closest ? e.target.closest('.cart-item__remove') : null;
      if (!btn) return;
      var index = parseInt(btn.getAttribute('data-index'), 10);
      if (isNaN(index)) return;
      var row = btn.closest('tr.cart-item');
      if (row && !row.classList.contains('cm-removing')) {
        row.classList.add('cm-removing');
        setTimeout(function () { removeFromCart(index); }, 300);
      }
    });
  });
})();
