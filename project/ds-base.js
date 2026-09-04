// Carrega o design system ERK Pratas nesta página.
(() => {
  const base = '_ds/erk-pratas-design-system-e111e2ad-3f29-4dc9-994e-a188ff4a6290';
  for (const p of ['styles.css']) {
    const l = document.createElement('link');
    l.rel = 'stylesheet'; l.href = base + '/' + p;
    document.head.appendChild(l);
  }
  const s = document.createElement('script');
  s.src = base + '/_ds_bundle.js';
  s.onerror = () => console.error('ds-base.js: falhou ao carregar ' + s.src);
  document.head.appendChild(s);
})();
