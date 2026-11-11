const filtros = document.querySelectorAll(".filter");
const tarjetas = document.querySelectorAll(".card");

filtros.forEach((boton) => {
  boton.addEventListener("click", () => {
    filtros.forEach((b) => b.classList.remove("active"));
    boton.classList.add("active");

    const filtro = boton.dataset.filter;

    tarjetas.forEach((tarjeta) => {
      const categoria = tarjeta.dataset.category;

      if (filtro === "todos" || categoria === filtro) {
        tarjeta.style.display = "block";
      } else {
        tarjeta.style.display = "none";
      }
    });
  });
});

function pedirProducto(producto) { window.open('https://www.instagram.com/cubo_3d.ar/', '_blank', 'noopener'); }
