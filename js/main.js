
/* =====================================
   VESTAMANIA - JAVASCRIPT GENERAL
   ===================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================
       INDEX - PÁGINA PRINCIPAL
       ===================================== */

    let tarjetaDepartamentos = document.querySelector(
        '[data-bs-target="#modalDepartamentos"]'
    );

    let tarjetaEmpleados = document.querySelector(
        '[data-bs-target="#modalEmpleados"]'
    );

    let tarjetaTareas = document.querySelector(
        '[data-bs-target="#modalTareas"]'
    );

    if (tarjetaDepartamentos) {
        console.log("Tarjeta de departamentos preparada");
    }

    if (tarjetaEmpleados) {
        console.log("Tarjeta de empleados preparada");
    }

    if (tarjetaTareas) {
        console.log("Tarjeta de tareas preparada");
    }

});
/* ==========================================
   VESTAMANIA - INICIO DE SESIÓN
   ========================================== */

document.addEventListener("DOMContentLoaded", function () {

    // Buscar el formulario de inicio de sesión
    let formularioLogin = document.querySelector(".login-card form");

    // Solo ejecutar este código en login.html
    if (formularioLogin) {

        // Obtener los campos
        let correoLogin = formularioLogin.querySelector(
            'input[type="email"]'
        );

        let contrasenaLogin = formularioLogin.querySelector(
            'input[type="password"]'
        );

        // Usuarios de prueba
        let usuarios = [
            {
                correo: "admin@vestamania.test",
                contrasena: "Admin1234!",
                rol: "admin"
            },
            {
                correo: "empleado@vestamania.test",
                contrasena: "Empleado1234!",
                rol: "empleado"
            }
        ];

        // Comprobar el formulario
        formularioLogin.addEventListener("submit", function (evento) {

            evento.preventDefault();

            let correo = correoLogin.value.trim().toLowerCase();
            let contrasena = contrasenaLogin.value;

            // Comprobar campos vacíos
            if (correo === "" || contrasena === "") {
                alert("Debes completar todos los campos.");
                return;
            }

            // Buscar usuario
            let usuarioEncontrado = usuarios.find(function (usuario) {
                return usuario.correo === correo &&
                       usuario.contrasena === contrasena;
            });

            // Comprobar credenciales
            if (!usuarioEncontrado) {
                alert("Correo electrónico o contraseña incorrectos.");
                return;
            }

            // Redirigir según el rol
            if (usuarioEncontrado.rol === "admin") {

                window.location.href = "admin.html";

            } else if (usuarioEncontrado.rol === "empleado") {

                window.location.href = "empleado.html";

            }

        });

        /* =====================================
           MOSTRAR Y OCULTAR CONTRASEÑA
           ===================================== */

        let botonMostrar = formularioLogin.querySelector(
            'button[aria-label*="contraseña"]'
        );

        if (botonMostrar) {

            botonMostrar.addEventListener("click", function () {

                if (contrasenaLogin.type === "password") {

                    contrasenaLogin.type = "text";

                } else {

                    contrasenaLogin.type = "password";

                }

                // Cambiar el icono del ojo
                let icono = botonMostrar.querySelector("i");

                if (icono) {

                    icono.classList.toggle("bi-eye");
                    icono.classList.toggle("bi-eye-slash");

                }

            });

        }

    }

});
