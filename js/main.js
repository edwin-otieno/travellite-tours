(() => {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
  }
  if (header) {
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }
  const params = new URLSearchParams(window.location.search);
  const tour = params.get('tour');
  const select = document.getElementById('tour-select');
  if (tour && select) {
    for (const opt of select.options) {
      if (opt.value === tour) {
        select.value = tour;
        break;
      }
    }
  }

  const slideshow = document.querySelector('[data-hero-slideshow]');
  const dotsWrap = document.querySelector('[data-hero-dots]');
  if (!slideshow) return;

  const slides = Array.from(slideshow.querySelectorAll('.hero-slide'));
  if (slides.length < 2) return;

  let index = slides.findIndex((s) => s.classList.contains('is-active'));
  if (index < 0) index = 0;
  let timer = null;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const intervalMs = reduceMotion ? 9000 : 5500;

  const dots = slides.map((_, i) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'hero-dot' + (i === index ? ' is-active' : '');
    btn.setAttribute('aria-label', `Show slide ${i + 1}`);
    btn.setAttribute('role', 'tab');
    btn.addEventListener('click', () => goTo(i, true));
    if (dotsWrap) dotsWrap.appendChild(btn);
    return btn;
  });

  function goTo(next, userTriggered) {
    if (next === index) return;
    slides[index].classList.remove('is-active');
    dots[index]?.classList.remove('is-active');
    index = (next + slides.length) % slides.length;
    slides[index].classList.add('is-active');
    dots[index]?.classList.add('is-active');
    if (userTriggered) restart();
  }

  function next() {
    goTo(index + 1, false);
  }

  function restart() {
    if (timer) clearInterval(timer);
    timer = setInterval(next, intervalMs);
  }

  restart();

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (timer) clearInterval(timer);
      timer = null;
    } else {
      restart();
    }
  });
})();
