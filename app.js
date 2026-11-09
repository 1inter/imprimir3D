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

function pedirProducto(producto) {
  // CAMBIÁ ESTE NÚMERO POR TU WHATSAPP.
  // Ejemplo Argentina: 54 + 9 + código de área + número.
  const numero = "5491100000000";

  const mensaje =
    `Hola! Quería consultar por ${producto}. ¿Me podés pasar precio, tamaño y colores disponibles?`;

  const url =
    `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;

  window.open(url, "_blank");
}
