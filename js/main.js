// Esperar a que el contenido del documento HTML esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
    // Obtener el botón de cambio de tema por su ID
    const btnTema = document.getElementById("btn-tema");

    // Leer la preferencia de tema guardada en el navegador (si existe)
    const temaGuardado = localStorage.getItem("tema");

    // Si el usuario eligió previamente el modo claro
    if (temaGuardado === "claro") {      
        document.body.classList.add("modo-claro");// Activar modo claro      
        btnTema.textContent = "🌙";// Cambiar el texto del botón para indicar que puede volver al modo oscuro
    } else {
      // Si no hay tema guardado o era oscuro, aplicar modo oscuro por defecto
        document.body.classList.add("modo-oscuro");      
        btnTema.textContent = "☀️";// Cambiar el texto del botón para indicar que puede pasar a modo claro
    }
    // Escuchar el clic en el botón para cambiar el tema
    btnTema.addEventListener("click", () => {
      // Si actualmente está en modo oscuro
    if (document.body.classList.contains("modo-oscuro")) {        
        document.body.classList.replace("modo-oscuro", "modo-claro");// Cambiar a modo claro        
        localStorage.setItem("tema", "claro");// Guardar la preferencia en el navegador        
        btnTema.textContent = "🌙";// Cambiar el texto del botón
    } else {
        // Si está en modo claro, cambiar a modo oscuro
        document.body.classList.replace("modo-claro", "modo-oscuro");        
        localStorage.setItem("tema", "oscuro");// Guardar la preferencia        
        btnTema.textContent = "☀️";// Cambiar el texto del botón
    }
    });
});  