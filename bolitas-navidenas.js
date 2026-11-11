document.addEventListener('DOMContentLoaded', () => {
  // Adornos únicamente en los destacados, con espacio propio para no cubrir contenido.
  const targets = document.querySelectorAll('.christmas-home-feature, .christmas-feature, .shop-featured');
  targets.forEach((section) => {
    if (section.querySelector('.cubo-baubles')) return;
    section.classList.add('cubo-bauble-host');
    const hanging = document.createElement('div');
    hanging.className = 'cubo-baubles';
    hanging.setAttribute('aria-hidden', 'true');
    ['#d8364d', '#d6ad55', '#a06be5'].forEach((color, j) => {
      const ornament = document.createElement('span');
      ornament.className = 'cubo-bauble';
      ornament.style.setProperty('--ornament', color);
      ornament.style.setProperty('--cord', `${12 + j * 5}px`);
      hanging.appendChild(ornament);
    });
    section.prepend(hanging);
  });
});
