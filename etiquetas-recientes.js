(()=>{
'use strict';
const KEY='impresiones3d_vistos_v1', MAX=6;
const page=location.pathname.split('/').pop()||'index.html';
const getHistory=()=>{try{const a=JSON.parse(localStorage.getItem(KEY)||'[]');return Array.isArray(a)?a.filter(x=>x&&typeof x.src==='string'&&typeof x.title==='string').slice(0,MAX):[]}catch(e){return []}};
const safeSrc=(src)=>{try{const u=new URL(src,location.href);return u.origin===location.origin&&!u.pathname.startsWith('//')?u.pathname.split('/').slice(-3).join('/'):null}catch(e){return null}};
function record(img,title){
 const src=safeSrc(img.getAttribute('src'));if(!src)return;
 const data={src,title:(title||img.alt||'Impresión 3D').trim().slice(0,100),page};
 const all=[data,...getHistory().filter(x=>x.src!==src)].slice(0,MAX);
 try{localStorage.setItem(KEY,JSON.stringify(all))}catch(e){}
 render();
}
function badge(el,label,kind){if(!el||el.querySelector(':scope > .product-mark'))return;const b=document.createElement('span');b.className='product-mark'+(kind?' product-mark--'+kind:'');b.textContent=label;el.appendChild(b)}
function setup(){
 // Destacados en inicio y galería: etiquetas seleccionadas, sin inventar ventas ni stock.
 document.querySelectorAll('.card').forEach((card,i)=>{const holder=card.querySelector('.card-image');if(i<2)badge(holder,'Destacado','popular');else if(i===2||i===3)badge(holder,'Personalizable');});
 document.querySelectorAll('.gallery-card').forEach((card,i)=>{if(i===0||i===1)badge(card.querySelector('.photo-open'),'Destacado','popular');});
 // Solo se guarda al abrir o seleccionar una foto, no por desplazarse o cargar la página.
 document.addEventListener('click',e=>{
  const opener=e.target.closest('.photo-open,.card-image,.carousel-slide');
  if(!opener)return;
  const img=opener.querySelector('img');if(!img)return;
  const card=opener.closest('.gallery-card,.card,.carousel-slide');
  const title=card?.getAttribute('data-title')||card?.querySelector('h3,.carousel-caption')?.textContent||img.alt;
  record(img,title);
 },true);
 // Las fotos de carrusel también pueden verse por clic en algunos diseños.
 render();
}
function render(){
 let section=document.getElementById('recentlyViewed');
 const items=getHistory();
 if(!items.length){if(section)section.remove();return}
 if(!section){
  section=document.createElement('section');section.id='recentlyViewed';section.className='recently-viewed';
  const footer=document.querySelector('footer');if(footer)footer.before(section);else document.body.appendChild(section);
 }
 section.replaceChildren();
 const heading=document.createElement('h2');heading.textContent='Vistos recientemente';section.appendChild(heading);
 const desc=document.createElement('p');desc.textContent='Volvé a encontrar las impresiones que estuviste mirando.';section.appendChild(desc);
 const grid=document.createElement('div');grid.className='recently-grid';section.appendChild(grid);
 items.forEach(item=>{
  const a=document.createElement('a');a.className='recent-item';
  const dest=item.page==='galeria.html'?'galeria.html':'index.html';a.href=dest;
  const img=document.createElement('img');img.loading='lazy';img.alt=item.title;img.src=item.src;
  const label=document.createElement('span');label.textContent=item.title;
  a.append(img,label);grid.appendChild(a);
 });
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',setup);else setup();
})();
