// Carrusel automático con flechas, puntos y pausa al pasar el mouse.
document.querySelectorAll('.auto-carousel').forEach(carousel => {
  const slides = [...carousel.querySelectorAll('.carousel-slide')];
  const dotsContainer = carousel.querySelector('.carousel-dots');
  let current = 0;
  let timer = null;
  const interval = Math.max(2000, Number(carousel.dataset.interval) || 4000);
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'carousel-dot';
    dot.setAttribute('aria-label', `Ver imagen ${i + 1}`);
    dot.addEventListener('click', () => { show(i); restart(); });
    dotsContainer.appendChild(dot);
  });
  const dots = [...dotsContainer.children];
  function show(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      const active = i === current;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', String(!active));
      dots[i].classList.toggle('is-active', active);
      dots[i].setAttribute('aria-current', active ? 'true' : 'false');
    });
  }
  function stop() { if (timer !== null) { clearInterval(timer); timer = null; } }
  function start() { if (!reducedMotion && !document.hidden && timer === null && slides.length > 1) timer = setInterval(() => show(current + 1), interval); }
  function restart() { stop(); start(); }
  carousel.querySelector('.carousel-prev').addEventListener('click', () => { show(current - 1); restart(); });
  carousel.querySelector('.carousel-next').addEventListener('click', () => { show(current + 1); restart(); });
  carousel.addEventListener('mouseenter', stop);
  carousel.addEventListener('mouseleave', start);
  carousel.addEventListener('focusin', stop);
  carousel.addEventListener('focusout', event => { if (!carousel.contains(event.relatedTarget)) start(); });
  carousel.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault(); show(current + (event.key === 'ArrowRight' ? 1 : -1)); restart();
    }
  });
  document.addEventListener('visibilitychange', () => document.hidden ? stop() : start());
  show(0); start();
});
