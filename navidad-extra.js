document.addEventListener('DOMContentLoaded',()=>{
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const panel=document.createElement('aside');panel.className='xmas-countdown';panel.setAttribute('aria-label','Cuenta regresiva para Navidad');
  panel.innerHTML='<span class="xmas-countdown-icon" aria-hidden="true">🎄</span><div><strong>Falta para Navidad</strong><span class="xmas-countdown-time" id="xmasClock">Calculando…</span></div>';
  const target=document.querySelector('.christmas-home-feature')||document.querySelector('.christmas-feature')||document.querySelector('.shop-featured');
  if(target)target.insertAdjacentElement('beforebegin',panel);
  else document.querySelector('main')?.prepend(panel);
  const clock=panel.querySelector('#xmasClock');
  function updateClock(){
    const now=new Date(), year=now.getFullYear();let date=new Date(year,11,25,0,0,0);
    if(now>=date)date=new Date(year+1,11,25,0,0,0);
    const total=Math.max(0,Math.floor((date-now)/1000));
    const d=Math.floor(total/86400),h=Math.floor(total%86400/3600),m=Math.floor(total%3600/60),s=total%60;
    clock.textContent=`${d} días · ${String(h).padStart(2,'0')}h ${String(m).padStart(2,'0')}m ${String(s).padStart(2,'0')}s`;
  }
  updateClock();setInterval(updateClock,1000);
  const sleigh=document.createElement('div');sleigh.className='xmas-flying-sleigh';sleigh.setAttribute('aria-hidden','true');
  sleigh.innerHTML='<span>🦌</span><span>🛷🎅</span>';document.body.appendChild(sleigh);
  if(!reduce){
    function fly(){sleigh.classList.remove('is-flying');void sleigh.offsetWidth;sleigh.classList.add('is-flying')}
    setTimeout(fly,3500);setInterval(fly,42000);
  }
  const globe=document.createElement('button');globe.type='button';globe.className='xmas-snowglobe';globe.setAttribute('aria-label','Agitar bola de nieve y estrellas');globe.title='¡Tocá para hacer caer copos y estrellas!';
  globe.innerHTML='<span class="xmas-globe-glass"><span class="xmas-globe-tree">🎄</span><span class="xmas-globe-flakes">❄ ✦ ❅</span></span><span class="xmas-globe-base"></span><span class="xmas-globe-label">Agitá la bola</span>';
  document.body.appendChild(globe);
  let burstTimeout;
  globe.addEventListener('click',()=>{
    // Cada pulsación genera una lluvia nueva, incluso si la anterior sigue activa.
    const old=document.querySelector('.xmas-star-rain');if(old)old.remove();
    if(burstTimeout)clearTimeout(burstTimeout);
    globe.classList.remove('is-shaking');void globe.offsetWidth;globe.classList.add('is-shaking');
    const rain=document.createElement('div');rain.className='xmas-star-rain';rain.setAttribute('aria-hidden','true');document.body.appendChild(rain);
    const colors=['#eaf8ff','#ffffff','#cceaff','#fff2a4','#ffd45c','#d9a7ff'];
    for(let i=0;i<320;i++){
      const star=document.createElement('span');star.className='xmas-falling-star '+(i%5<4?'xmas-flake':'xmas-gold-star');
      star.textContent=i%5<4?(i%3===0?'❅':'❄'):(i%2===0?'✦':'★');
      star.style.left=`${Math.random()*100}%`;
      star.style.top=`${-10-Math.random()*95}px`;
      star.style.color=i%5<4?colors[i%3]:colors[3+(i%3)];
      star.style.fontSize=`${i%5<4?12+Math.random()*16:13+Math.random()*15}px`;
      star.style.setProperty('--drift',`${(Math.random()-.5)*170}px`);
      star.style.setProperty('--spin',`${(Math.random()-.5)*520}deg`);
      star.style.animationDelay=`${Math.random()*3.5}s`;
      star.style.animationDuration=`${4.0+Math.random()*3.2}s`;
      rain.appendChild(star);
    }
    burstTimeout=setTimeout(()=>{rain.remove();globe.classList.remove('is-shaking')},11500);
  });
});
