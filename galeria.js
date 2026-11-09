// Agregá nuevas fotos en galeria.html copiando una tarjeta .gallery-card.
// Poné la imagen en la carpeta imagenes y cambiá el nombre, categoría y texto.
const galleryCards=[...document.querySelectorAll('.gallery-card')];
const filterButtons=[...document.querySelectorAll('.gallery-filter')];
const dialog=document.getElementById('photoDialog');
const dialogImage=document.getElementById('dialogImage');
const dialogTitle=document.getElementById('dialogTitle');
let activeIndex=0;
function visibleCards(){return galleryCards.filter(card=>!card.hidden)}
function showPhoto(card){const img=card.querySelector('img');dialogImage.src=img.src;dialogImage.alt=img.alt;dialogTitle.textContent=card.dataset.title;activeIndex=visibleCards().indexOf(card);if(!dialog.open)dialog.showModal()}
function movePhoto(delta){const visible=visibleCards();if(!visible.length)return;activeIndex=(activeIndex+delta+visible.length)%visible.length;showPhoto(visible[activeIndex])}
filterButtons.forEach(button=>button.addEventListener('click',()=>{filterButtons.forEach(b=>b.classList.remove('selected'));button.classList.add('selected');const filter=button.dataset.filter;galleryCards.forEach(card=>{card.hidden=filter!=='todos'&&card.dataset.category!==filter});const n=visibleCards().length;document.getElementById('galleryCount').textContent=`${n} ${n===1?'impresión':'impresiones'}`}));
galleryCards.forEach(card=>{card.querySelector('.photo-open').addEventListener('click',()=>showPhoto(card));card.querySelector('.gallery-consult').addEventListener('click',()=>pedirProducto(card.dataset.title))});
document.getElementById('closeDialog').addEventListener('click',()=>dialog.close());
document.getElementById('prevPhoto').addEventListener('click',()=>movePhoto(-1));
document.getElementById('nextPhoto').addEventListener('click',()=>movePhoto(1));
document.getElementById('dialogConsult').addEventListener('click',()=>pedirProducto(visibleCards()[activeIndex].dataset.title));
dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
document.addEventListener('keydown',e=>{if(!dialog.open)return;if(e.key==='ArrowLeft')movePhoto(-1);if(e.key==='ArrowRight')movePhoto(1)});
