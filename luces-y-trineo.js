document.addEventListener('DOMContentLoaded', () => {

  // Se eliminó el trineo volador; se conservan las luces.
  // Mantener únicamente las pelotitas de luces de colores.
  const colors = ['#ff4e55','#ffe28c','#48e5a4','#83c6ff','#dca6ff'];
  function lights(host,count) {
    if (!host) return;
    const wire = document.createElement('div');
    wire.className = 'xmas-drop-lights';
    wire.setAttribute('aria-hidden','true');
    for(let i=0;i<count;i++) {
      const bulb=document.createElement('i');
      bulb.className='xmas-drop-bulb';
      bulb.style.setProperty('--bulb',colors[i%colors.length]);
      bulb.style.setProperty('--delay',`${(i%5)*-.25}s`);
      bulb.style.setProperty('--drop',`${12+(i*13)%25}px`);
      wire.appendChild(bulb);
    }
    host.appendChild(wire);
  }
  document.querySelectorAll('.hero,.shop-featured').forEach(el => {
    el.classList.add('xmas-lights-host'); lights(el,22);
  });
  const top=document.createElement('div');
  top.className='xmas-top-garland';
  if (!document.body.classList.contains('gallery-page') && !/galeria\.html$/i.test(location.pathname)) { document.body.prepend(top); lights(top,35); }
});
