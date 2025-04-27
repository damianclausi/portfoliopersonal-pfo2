// Proyecto PFO2 - main.js
// Funcionalidades implementadas:
// 1. Primera funcionalidad: Cambio de tema (Modo Oscuro/Claro)
// 2. Segunda funcionalidad: Pop-up de confirmación al enviar el formulario de contacto
// 3. Tercera funcionalidad: Temporizador de tiempo restante
// 4. Cuarta funcionalidad: Animaciones dinámicas en tarjetas, botones y posters
// 5. Quinta funcionalidad: Partículas dinámicas que cambian según el tema

// Esperar a que el contenido del documento HTML esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {

    // ==========================
    // Primera funcionalidad: Cambio de tema (Modo Oscuro/Claro)
    // ==========================

    // Obtener el botón de cambio de tema por su ID
    const btnTema = document.getElementById("btn-tema");

    // Leer la preferencia de tema guardada en el navegador (si existe)
    const temaGuardado = localStorage.getItem("tema");

    // Si el usuario eligió previamente el modo claro
    if (temaGuardado === "claro") {
        document.body.classList.add("modo-claro");
        btnTema.textContent = "🌙"; // Cambiar el texto del botón para indicar que puede volver al modo oscuro
    } else {
        // Si no hay tema guardado o era oscuro, aplicar modo oscuro por defecto
        document.body.classList.add("modo-oscuro");
        btnTema.textContent = "☀️"; // Cambiar el texto del botón para indicar que puede pasar a modo claro
    }

    // ==========================
    // Función para inicializar las partículas con el color adecuado
    // ==========================

    function inicializarParticulas() {
        let colorParticulas = "#ffffff"; // Por defecto, blanco
        if (document.body.classList.contains("modo-claro")) {
            colorParticulas = "#1e1e2e"; // Gris oscuro en modo claro
        }

        tsParticles.load("tsparticles", {
            fullScreen: { enable: true, zIndex: -1 },
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        area: 800
                    }
                },
                color: { value: colorParticulas },
                shape: { type: "circle" },
                opacity: { value: 0.5 },
                size: { value: 2, random: true },
                links: {
                    enable: true,
                    distance: 150,
                    color: colorParticulas,
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: "none",
                    random: false,
                    straight: false,
                    outModes: {
                        default: "out"
                    }
                }
            },
            interactivity: {
                events: {
                    onhover: {
                        enable: true,
                        mode: "repulse"
                    },
                    onclick: {
                        enable: true,
                        mode: "push"
                    }
                },
                modes: {
                    repulse: { distance: 100 },
                    push: { quantity: 4 }
                }
            },
            background: {
                color: "transparent"
            }
        });
    }

    // Inicializar partículas según el tema al cargar
    inicializarParticulas();

    // Escuchar el clic en el botón para cambiar el tema
    btnTema.addEventListener("click", () => {
        if (document.body.classList.contains("modo-oscuro")) {
            document.body.classList.replace("modo-oscuro", "modo-claro"); // Cambiar a modo claro
            localStorage.setItem("tema", "claro"); // Guardar la preferencia
            btnTema.textContent = "🌙"; // Cambiar el texto del botón
        } else {
            document.body.classList.replace("modo-claro", "modo-oscuro"); // Cambiar a modo oscuro
            localStorage.setItem("tema", "oscuro"); // Guardar la preferencia
            btnTema.textContent = "☀️"; // Cambiar el texto del botón
        }

        // Volver a cargar las partículas con el nuevo color
        tsParticles.dom().forEach(instance => instance.destroy()); // Eliminar partículas existentes
        inicializarParticulas(); // Volver a crear partículas con nuevo color
    });

    // ==========================
    // Segunda funcionalidad: Pop-up de confirmación de envío de formulario
    // ==========================

    // Obtener el formulario de contacto por su clase
    const formulario = document.querySelector(".formulario-contacto");

    // Verificar que el formulario exista antes de trabajar con él
    if (formulario) {
        // Escuchar el evento de envío del formulario
        formulario.addEventListener("submit", (event) => {
            event.preventDefault(); // Evitar el comportamiento predeterminado de envío

            // Mostrar un mensaje emergente de confirmación usando SweetAlert2
            Swal.fire({
                icon: 'success',
                title: '¡Formulario enviado!',
                text: 'Tu mensaje fue enviado exitosamente.',
                confirmButtonText: 'Aceptar'
            });

            // Limpiar los campos del formulario después del envío
            formulario.reset();
        });
    }

    // ==========================
    // Tercera funcionalidad: Temporizador de tiempo restante
    // ==========================

    // Función para actualizar el temporizador
    function actualizarTemporizador() {
        const fechaLimite = new Date("2025-05-05T23:59:00"); // FECHA LÍMITE
        const ahora = new Date();
        const diferencia = fechaLimite - ahora;
        const tiempoRestante = document.getElementById("tiempo-restante");

        if (diferencia <= 0) {
            tiempoRestante.textContent = "¡Finalizado!";
            clearInterval(intervaloTemporizador); // Detener el temporizador
            return;
        }

        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

        tiempoRestante.textContent = `${dias}d ${horas}h ${minutos}m ${segundos}s`;
    }

    // Llamar la función cada segundo
    const intervaloTemporizador = setInterval(actualizarTemporizador, 1000);

    // Actualizar una vez apenas se cargue la página
    actualizarTemporizador();

    // ==========================
    // Cuarta funcionalidad: Animaciones dinámicas en tarjetas, botones y posters
    // ==========================

    // Animar las tarjetas de proyectos
    const tarjetas = document.querySelectorAll(".tarjeta");

    tarjetas.forEach(tarjeta => {
        tarjeta.addEventListener("mouseover", () => {
            tarjeta.style.transform = "scale(1.05)";
            tarjeta.style.transition = "transform 0.3s ease";
        });
        tarjeta.addEventListener("mouseout", () => {
            tarjeta.style.transform = "scale(1)";
        });
    });

    // Animar los posters de películas (figures)
    const posters = document.querySelectorAll("#peliculas-favoritas figure");

    posters.forEach(poster => {
        poster.addEventListener("mouseover", () => {
            poster.style.transform = "scale(1.05)";
            poster.style.transition = "transform 0.3s ease";
        });
        poster.addEventListener("mouseout", () => {
            poster.style.transform = "scale(1)";
        });
    });

    // Animar los botones
    const botones = document.querySelectorAll("button");

    botones.forEach(boton => {
        boton.addEventListener("mouseover", () => {
            boton.style.transform = "scale(1.1)";
            boton.style.transition = "transform 0.2s ease";
        });
        boton.addEventListener("mouseout", () => {
            boton.style.transform = "scale(1)";
        });
    });

});
