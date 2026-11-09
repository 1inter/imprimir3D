document.addEventListener('DOMContentLoaded',()=>{
 const colors=['#ff4e55','#ffe28c','#48e5a4','#83c6ff','#dca6ff'];
 function garland(host,count=15){
  const wire=document.createElement('div');wire.className='xmas-drop-lights';wire.setAttribute('aria-hidden','true');
  for(let i=0;i<count;i++){const bulb=document.createElement('i');bulb.className='xmas-drop-bulb';bulb.style.setProperty('--bulb',colors[i%colors.length]);bulb.style.setProperty('--delay',`${(i%5)*-.25}s`);bulb.style.setProperty('--drop',`${12+(i*13)%25}px`);wire.appendChild(bulb)}
  host.appendChild(wire);
 }
 document.querySelectorAll('.hero,.gallery-hero,.shop-featured').forEach((el,i)=>{
  el.classList.add('xmas-decorated');garland(el,el.classList.contains('category-section')?12:22);
  if(i%2===0){const deco=document.createElement('span');deco.className='xmas-frame-ornament';deco.textContent=i%4===0?'🎅':'🎄';deco.setAttribute('aria-hidden','true');el.appendChild(deco)}
 });
 const top=document.createElement('div');top.className='xmas-top-garland';document.body.prepend(top);garland(top,35);

 // Adornos adicionales, sin modificar las guirnaldas de luces existentes.
 const decorativeSections=document.querySelectorAll('.christmas-home-feature,.christmas-feature,.category-section,.shop-tools,.shop-home-links,.shop-featured,.works,.benefits');
 decorativeSections.forEach((section,index)=>{
   section.classList.add('xmas-trimmed');
   const pine=document.createElement('div');
   pine.className='xmas-pine-corner';pine.setAttribute('aria-hidden','true');
   pine.innerHTML='<span class="pine-branch">🌲</span><span class="pine-berry">● ● ●</span>';
   section.appendChild(pine);
   const snowcap=document.createElement('div');snowcap.className='xmas-snowcap';snowcap.setAttribute('aria-hidden','true');section.appendChild(snowcap);
   if(index%2===0){
     const hat=document.createElement('span');hat.className='xmas-hat';hat.textContent='🎅';hat.setAttribute('aria-hidden','true');section.appendChild(hat);
   }
   if(index%3===0){
     const gifts=document.createElement('span');gifts.className='xmas-gifts';gifts.textContent='🎁';gifts.setAttribute('aria-hidden','true');section.appendChild(gifts);
   }
   if(index%2===1){
     const hanging=document.createElement('div');hanging.className='xmas-baubles';hanging.setAttribute('aria-hidden','true');
     ['#d8364d','#d6ad55','#a06be5'].forEach((color,j)=>{
       const ornament=document.createElement('span');ornament.className='xmas-bauble';ornament.style.setProperty('--ornament',color);ornament.style.setProperty('--cord',`${16+j*8}px`);hanging.appendChild(ornament);
     });
     section.appendChild(hanging);
   }
 });
 document.querySelectorAll('.hero-text h1,.gallery-hero h1,.shop-featured h2,.shop-intro h2').forEach((title,index)=>{
   if(index%2===0){title.classList.add('xmas-sparkle-title')}
 });

 const snow=document.createElement('div');snow.className='xmas-snow';snow.setAttribute('aria-hidden','true');
 for(let i=0;i<18;i++){const flake=document.createElement('span');flake.className='xmas-flake';flake.textContent='❄';flake.style.left=`${(i*37.7)%100}%`;flake.style.fontSize=`${10+(i%4)*3}px`;flake.style.animationDuration=`${11+(i%6)*2}s`;flake.style.animationDelay=`${-i*1.5}s`;flake.style.setProperty('--drift',`${(i%2?1:-1)*40}px`);snow.appendChild(flake)}
 document.body.appendChild(snow);
});