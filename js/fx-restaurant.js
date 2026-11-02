(() => {
  const R = matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('.fxs-grid img').forEach(i => i.addEventListener('error', () => i.closest('figure').classList.add('fx-broken')));
  const hero = document.querySelector('.hero');
  if (hero && !R) {
    const e = document.createElement('div'); e.className = 'fxs-embers'; e.setAttribute('aria-hidden', 'true');
    e.innerHTML = Array.from({ length: 16 }, (_, k) => `<i style="--x:${(k * 6.4 + (k % 3) * 3) % 100}%;--s:${3 + (k % 4) * 2}px;--t:${9 + (k % 5) * 2}s;--d:${-k * 1.1}s;--dx:${(k % 2 ? 1 : -1) * (20 + k * 3)}px"></i>`).join('');
    const g = document.createElement('div'); g.className = 'fxs-glow'; g.setAttribute('aria-hidden', 'true'); hero.prepend(g, e);
  }
  const targets = [...document.querySelectorAll('.dish-photo,.story-visual,.experience-image,.fxs-grid figure')];
  if (R || !('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver(es => es.forEach(x => { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); } }), { threshold: .2 });
  targets.forEach((el, i) => { el.classList.add('fxs-cur'); el.style.setProperty('--dl', (i % 3) * .15 + 's'); const c = document.createElement('b'); c.className = 'fxs-cover'; c.setAttribute('aria-hidden', 'true'); el.append(c); io.observe(el); });
})();
