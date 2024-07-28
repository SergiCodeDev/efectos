/* Modo 1 */

function eliminarElemento(event) {
    // Obtener el botón que fue clicado
    const boton = event.target;
    // Encontrar el contenedor más cercano con la clase "escuchar"
    const elemento = boton.closest(".anim-css");
    // Si se encuentra el contenedor, eliminarlo
    if (elemento) {
        elemento.classList.add("quitar");
        //opcional para eliminarlo del todo
            // Escuchar el final de la animación para eliminar el elemento
        elemento.addEventListener('animationend', () => {
            elemento.remove();
        }, { once: true }); // Eliminar el evento después de ejecutarse una vez
    }
}

function seleccionarBotones() {
    // Añadir un evento de clic a cada botón con la clase "btn-eliminar-css"
    document.querySelectorAll(".btn-eliminar-css").forEach(boton => {
        boton.addEventListener("click", eliminarElemento);
    });
}

// Añadir los eventos de clic cuando el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", seleccionarBotones);

/* Modo 2 */

document.addEventListener("click", (e) => {
    // Verifica si el clic ocurrió dentro del section con id="js"
    const section = document.getElementById("js");
    if (section.contains(e.target) && e.target.nodeName === "BUTTON") {
        const article = e.target.closest("article");

        // Agregar la clase que inicia la animación
        article.classList.add("hidden");

        // Escuchar el evento de finalización de la transición
        const handleTransitionEnd = (event) => {
            if (event.target === article) {
                // Después de la animación, ocultar el elemento
                article.style.display = 'none';
                // Eliminar el listener ya que la transición ya ha terminado
                article.removeEventListener('transitionend', handleTransitionEnd);
            }
        };

        article.addEventListener('transitionend', handleTransitionEnd);
    }
});