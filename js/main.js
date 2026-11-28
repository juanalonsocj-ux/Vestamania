
/* ==============================================
   VESTAMANIA - JAVASCRIPT GENERAL (PROTOTIPO)
   ==============================================
   IMPORTANTE: el acceso, registro y chat son demostraciones
   en el navegador. Laravel debe gestionar la seguridad real.
*/

/* =====================================
   CONTROL DE ACCESO PROVISIONAL
   ===================================== */

let paginaActual = window.location.pathname.split("/").pop();
let rolGuardado = sessionStorage.getItem("rol");

let paginasAdmin = [
    "admin.html",
    "departamentos.html",
    "empleados.html",
    "tareas.html",
    "mensajes-admin.html"
];

let paginasEmpleado = [
    "empleado.html",
    "mensajes.html"
];

if (paginasAdmin.includes(paginaActual) && rolGuardado !== "admin") {

    window.location.replace("login.html");

} else if (
    paginasEmpleado.includes(paginaActual) &&
    rolGuardado !== "empleado"
) {

    window.location.replace("login.html");

}


/* =====================================
   USUARIOS DE DEMOSTRACIÓN
   ===================================== */

let usuariosDemo = [
    {
        id: "1",
        nombre: "Administrador",
        correo: "admin@vestamania.test",
        contrasena: "Admin1234!",
        rol: "admin",
        departamento: "",
        puesto: "",
        aprobado: true
    },
    {
        id: "101",
        nombre: "Empleado de Almacén",
        correo: "empleado@vestamania.test",
        contrasena: "Empleado1234!",
        rol: "empleado",
        departamento: "Almacén",
        puesto: "Operario de almacén",
        aprobado: true
    },
    {
        id: "102",
        nombre: "Empleado de Ventas",
        correo: "ventas@vestamania.test",
        contrasena: "Ventas1234!",
        rol: "empleado",
        departamento: "Ventas",
        puesto: "Comercial",
        aprobado: true
    },
    {
        id: "103",
        nombre: "Empleado de Administración",
        correo: "oficina@vestamania.test",
        contrasena: "Oficina1234!",
        rol: "empleado",
        departamento: "Administración",
        puesto: "Auxiliar administrativo",
        aprobado: true
    }
];


/* =====================================
   FUNCIONES DE LAS PÁGINAS
   ===================================== */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================
       MOSTRAR AVISOS
       ===================================== */

    function mostrarAviso(elemento, mensaje, tipo) {

        if (!elemento) {
            return;
        }

        elemento.textContent = mensaje;
        elemento.className = "alert alert-" + tipo + " mt-3";

    }


    /* =====================================
       INICIAR SESIÓN
       ===================================== */

    let formularioLogin = document.getElementById("formLogin");

    if (formularioLogin) {

        formularioLogin.addEventListener("submit", function (evento) {

            evento.preventDefault();

            let correo = document.getElementById("correoLogin")
                .value.trim().toLowerCase();

            let contrasena = document.getElementById(
                "contrasenaLogin"
            ).value;

            let rol = document.getElementById("rolLogin").value;

            let avisoLogin = document.getElementById("avisoLogin");

            // Comprobar campos
            if (!correo || !contrasena || !rol) {

                mostrarAviso(
                    avisoLogin,
                    "Completa el correo, la contraseña y el rol.",
                    "danger"
                );

                return;
            }

            // Buscar el usuario de prueba
            let usuario = usuariosDemo.find(function (cuenta) {

                return cuenta.correo === correo &&
                    cuenta.contrasena === contrasena;

            });

            if (!usuario) {

                mostrarAviso(
                    avisoLogin,
                    "Correo o contraseña incorrectos.",
                    "danger"
                );

                return;
            }

            // Comprobar rol
            if (usuario.rol !== rol) {

                mostrarAviso(
                    avisoLogin,
                    "El rol seleccionado no corresponde a esta cuenta.",
                    "danger"
                );

                return;
            }

            // Comprobar autorización simulada
            if (!usuario.aprobado) {

                mostrarAviso(
                    avisoLogin,
                    "La cuenta está pendiente de autorización.",
                    "danger"
                );

                return;
            }

            // Guardar sesión de prueba sin contraseña
            sessionStorage.setItem("usuarioId", usuario.id);
            sessionStorage.setItem("nombre", usuario.nombre);
            sessionStorage.setItem("correo", usuario.correo);
            sessionStorage.setItem("rol", usuario.rol);

            sessionStorage.setItem(
                "departamento",
                usuario.departamento
            );

            sessionStorage.setItem("puesto", usuario.puesto);

            // Redirigir al panel correspondiente
            if (usuario.rol === "admin") {

                window.location.href = "admin.html";

            } else {

                window.location.href = "empleado.html";

            }

        });

    }


    /* =====================================
       REGISTRO SEGÚN EL ROL
       ===================================== */

    let formularioRegistro = document.getElementById(
        "formRegistro"
    );

    let selectorRolRegistro = document.getElementById(
        "registroRol"
    );

    let datosEmpleadoRegistro = document.getElementById(
        "datosEmpleadoRegistro"
    );

    let departamentoRegistro = document.getElementById(
        "registroDepartamento"
    );

    let puestoRegistro = document.getElementById(
        "registroPuesto"
    );

    let avisoRolRegistro = document.getElementById(
        "avisoRolRegistro"
    );

    let avisoSeguridadRegistro = document.getElementById(
        "avisoSeguridadRegistro"
    );


    /* =====================================
       ACTUALIZAR CAMPOS DEL REGISTRO
       ===================================== */

    function actualizarCamposRegistro() {

        if (!selectorRolRegistro || !datosEmpleadoRegistro) {
            return;
        }

        let rol = selectorRolRegistro.value;
        let esEmpleado = rol === "empleado";

        // Mostrar departamento y puesto solo para empleados
        datosEmpleadoRegistro.hidden = !esEmpleado;

        if (departamentoRegistro) {

            departamentoRegistro.required = esEmpleado;
            departamentoRegistro.enabled = !esEmpleado;

        }

        if (puestoRegistro) {

            puestoRegistro.required = esEmpleado;
            puestoRegistro.enabled = !esEmpleado;

        }

        // Texto debajo del desplegable
        if (avisoRolRegistro) {

            if (rol === "admin") {

                avisoRolRegistro.textContent =
                    "El rol Administrador necesita " +
                    "autorización de la empresa.";

            } else if (rol === "empleado") {

                avisoRolRegistro.textContent =
                    "Indica tu departamento y tu puesto de trabajo.";

            } else {

                avisoRolRegistro.textContent =
                    "Elige el tipo de cuenta que deseas solicitar.";

            }

        }

        // Aviso de seguridad
        if (avisoSeguridadRegistro) {

            if (rol === "admin") {

                avisoSeguridadRegistro.textContent =
                    "La empresa debe autorizar la solicitud. " +
                    "Elegir Administrador no concede permisos.";

            } else if (rol === "empleado") {

                avisoSeguridadRegistro.textContent =
                    "La empresa deberá verificar tu identidad " +
                    "y tu departamento antes de activar la cuenta.";

            } else {

                avisoSeguridadRegistro.textContent =
                    "Selecciona un rol para ver los requisitos.";

            }

        }

    }


    /* =====================================
       EVENTO DEL DESPLEGABLE
       ===================================== */

    if (selectorRolRegistro && datosEmpleadoRegistro) {

        selectorRolRegistro.addEventListener(
            "change",
            actualizarCamposRegistro
        );

        actualizarCamposRegistro();

    }


    /* =====================================
       VALIDAR REGISTRO
       ===================================== */

    if (formularioRegistro) {

        formularioRegistro.addEventListener("submit", function (evento) {

            evento.preventDefault();

            let nombre = document.getElementById(
                "registroNombre"
            ).value.trim();

            let correo = document.getElementById(
                "registroCorreo"
            ).value.trim().toLowerCase();

            let contrasena = document.getElementById(
                "registroContrasena"
            ).value;

            let confirmar = document.getElementById(
                "registroConfirmar"
            ).value;

            let rol = selectorRolRegistro
                ? selectorRolRegistro.value
                : "";

            let avisoRegistro = document.getElementById(
                "avisoRegistro"
            );

            if (!nombre || !correo || !contrasena ||
                !confirmar || !rol) {

                mostrarAviso(
                    avisoRegistro,
                    "Completa todos los campos obligatorios.",
                    "danger"
                );

                return;
            }

            if (rol !== "admin" && rol !== "empleado") {

                mostrarAviso(
                    avisoRegistro,
                    "Selecciona un rol válido.",
                    "danger"
                );

                return;
            }

            if (contrasena.length < 8) {

                mostrarAviso(
                    avisoRegistro,
                    "La contraseña debe tener al menos 8 caracteres.",
                    "danger"
                );

                return;
            }

            if (contrasena !== confirmar) {

                mostrarAviso(
                    avisoRegistro,
                    "Las contraseñas no coinciden.",
                    "danger"
                );

                return;
            }

            // Datos obligatorios para empleados
            if (rol === "empleado") {

                let departamento = departamentoRegistro
                    ? departamentoRegistro.value
                    : "";

                let puesto = puestoRegistro
                    ? puestoRegistro.value.trim()
                    : "";

                if (!departamento || !puesto) {

                    mostrarAviso(
                        avisoRegistro,
                        "Indica tu departamento y tu puesto de trabajo.",
                        "danger"
                    );

                    return;
                }

            }

            // Solo demostración: no se crean cuentas reales
            if (rol === "admin") {

                mostrarAviso(
                    avisoRegistro,
                    "Formulario válido. La cuenta NO se ha creado. " +
                    "El alta de administrador necesitará " +
                    "autorización mediante Laravel.",
                    "info"
                );

            } else {

                mostrarAviso(
                    avisoRegistro,
                    "Formulario válido. La cuenta NO se ha creado. " +
                    "El departamento deberá verificarse " +
                    "mediante Laravel.",
                    "info"
                );

            }

        });

    }


    /* =====================================
       MOSTRAR Y OCULTAR CONTRASEÑAS
       ===================================== */

    let botonesMostrar = document.querySelectorAll(
        "[data-toggle-password]"
    );

    botonesMostrar.forEach(function (boton) {

        boton.addEventListener("click", function () {

            let idCampo = boton.getAttribute(
                "data-toggle-password"
            );

            let campo = document.getElementById(idCampo);
            let icono = boton.querySelector("i");

            if (!campo) {
                return;
            }

            let mostrar = campo.type === "password";

            campo.type = mostrar ? "text" : "password";

            boton.setAttribute(
                "aria-label",
                mostrar ? "Ocultar contraseña" : "Mostrar contraseña"
            );

            if (icono) {

                icono.classList.toggle("bi-eye", !mostrar);
                icono.classList.toggle("bi-eye-slash", mostrar);

            }

        });

    });


    /* =====================================
       PERFIL DEL EMPLEADO
       ===================================== */

    let perfilCorreo = document.getElementById("perfilCorreo");
    let perfilNombre = document.getElementById("perfilNombre");

    let perfilDepartamento = document.getElementById(
        "perfilDepartamento"
    );

    let perfilPuesto = document.getElementById(
        "perfilPuesto"
    );

    if (perfilCorreo) {

        perfilCorreo.textContent =
            sessionStorage.getItem("correo") || "Sin datos";

    }

    if (perfilNombre) {

        perfilNombre.textContent =
            sessionStorage.getItem("nombre") || "Mi cuenta";

    }

    if (perfilDepartamento) {

        perfilDepartamento.textContent =
            sessionStorage.getItem("departamento") || "Sin asignar";

    }

    if (perfilPuesto) {

        perfilPuesto.textContent =
            sessionStorage.getItem("puesto") || "Sin asignar";

    }


    /* =====================================
       TAREAS DE DEMOSTRACIÓN
       ===================================== */

    let tareasDemo = [

        // ALMACÉN
        {
            id: 1,
            usuarioId: "101",
            departamento: "Almacén",
            titulo: "Revisar inventario del almacén",
            descripcion: "Comprobar existencias y productos pendientes.",
            prioridad: "Media",
            estado: "pendiente"
        },
        {
            id: 2,
            usuarioId: "101",
            departamento: "Almacén",
            titulo: "Organizar recepción de mercancía",
            descripcion: "Registrar la mercancía recibida.",
            prioridad: "Baja",
            estado: "finalizada"
        },

        // VENTAS
        {
            id: 3,
            usuarioId: "102",
            departamento: "Ventas",
            titulo: "Actualizar catálogo de productos",
            descripcion: "Revisar precios y descripciones del catálogo.",
            prioridad: "Alta",
            estado: "en_curso"
        },
        {
            id: 4,
            usuarioId: "102",
            departamento: "Ventas",
            titulo: "Preparar listado comercial",
            descripcion: "Revisar los productos de una campaña anterior.",
            prioridad: "Media",
            estado: "finalizada"
        },

        // ADMINISTRACIÓN
        {
            id: 5,
            usuarioId: "103",
            departamento: "Administración",
            titulo: "Revisar facturas",
            descripcion: "Comprobar las facturas pendientes de revisión.",
            prioridad: "Media",
            estado: "en_curso"
        },
        {
            id: 6,
            usuarioId: "103",
            departamento: "Administración",
            titulo: "Archivar documentación",
            descripcion: "Organizar documentos administrativos.",
            prioridad: "Baja",
            estado: "finalizada"
        }

    ];


    /* =====================================
       MOSTRAR LAS TAREAS DEL EMPLEADO
       ===================================== */

    let tituloTarea = document.getElementById(
        "tituloTareaActual"
    );

    if (tituloTarea) {

        let usuarioId = sessionStorage.getItem("usuarioId");

        let departamentoUsuario = sessionStorage.getItem(
            "departamento"
        );

        // Filtrar por empleado y departamento
        let misTareas = tareasDemo.filter(function (tarea) {

            return tarea.usuarioId === usuarioId &&
                tarea.departamento === departamentoUsuario;

        });

        // Obtener la tarea actual
        let tareaActual = misTareas.find(function (tarea) {

            return tarea.estado === "en_curso" ||
                tarea.estado === "pendiente";

        });

        let descripcionTarea = document.getElementById(
            "descripcionTareaActual"
        );

        let departamentoTarea = document.getElementById(
            "departamentoTareaActual"
        );

        let prioridadTarea = document.getElementById(
            "prioridadTareaActual"
        );

        let estadoTarea = document.getElementById(
            "estadoTareaActual"
        );

        if (tareaActual) {

            tituloTarea.textContent = tareaActual.titulo;

            if (descripcionTarea) {

                descripcionTarea.textContent =
                    tareaActual.descripcion;

            }

            if (departamentoTarea) {

                departamentoTarea.textContent =
                    "Departamento: " + tareaActual.departamento;

            }

            if (prioridadTarea) {

                prioridadTarea.textContent =
                    "Prioridad: " + tareaActual.prioridad;

            }

            if (estadoTarea) {

                let pendiente = tareaActual.estado === "pendiente";

                estadoTarea.textContent =
                    pendiente ? "Pendiente" : "En curso";

                estadoTarea.className = pendiente
                    ? "badge estado-pendiente"
                    : "badge estado-curso";

            }

        } else {

            tituloTarea.textContent = "Sin tarea actual";

            if (descripcionTarea) {

                descripcionTarea.textContent =
                    "No tienes ninguna tarea asignada en este momento.";

            }

            if (departamentoTarea) {

                departamentoTarea.textContent =
                    "Departamento: " +
                    (departamentoUsuario || "Sin asignar");

            }

            if (prioridadTarea) {

                prioridadTarea.textContent = "Prioridad: —";

            }

            if (estadoTarea) {

                estadoTarea.textContent = "Sin asignar";

                estadoTarea.className = "badge text-bg-secondary";

            }

        }


        /* =====================================
           LISTAS DE TAREAS
           ===================================== */

        function mostrarListaTareas(
            idContenedor,
            estado,
            textoVacio
        ) {

            let contenedor = document.getElementById(
                idContenedor
            );

            if (!contenedor) {
                return;
            }

            contenedor.replaceChildren();

            let lista = misTareas.filter(function (tarea) {

                return tarea.estado === estado;

            });

            // Si no hay tareas
            if (lista.length === 0) {

                let mensaje = document.createElement("div");

                mensaje.className =
                    "empleado-caja empleado-estado-vacio admin-muted";

                mensaje.textContent = textoVacio;

                contenedor.appendChild(mensaje);

                return;
            }

            // Crear las tarjetas
            lista.forEach(function (tarea) {

                let tarjeta = document.createElement("article");

                tarjeta.className = "empleado-caja";

                let titulo = document.createElement("h3");

                titulo.className = "h5 fw-bold mb-2";
                titulo.textContent = tarea.titulo;

                let descripcion = document.createElement("p");

                descripcion.className = "admin-muted mb-2";
                descripcion.textContent = tarea.descripcion;

                let detalles = document.createElement("p");

                detalles.className = "small admin-muted mb-0";

                detalles.textContent =
                    "Departamento: " + tarea.departamento +
                    " · Prioridad: " + tarea.prioridad;

                tarjeta.appendChild(titulo);
                tarjeta.appendChild(descripcion);
                tarjeta.appendChild(detalles);

                contenedor.appendChild(tarjeta);

            });

        }

        // Tareas pendientes
        mostrarListaTareas(
            "listaPendientes",
            "pendiente",
            "No tienes tareas pendientes."
        );

        // Tareas finalizadas
        mostrarListaTareas(
            "listaFinalizadas",
            "finalizada",
            "Aún no tienes tareas finalizadas."
        );

    }


    /* =====================================
       CERRAR SESIÓN
       ===================================== */

    let botonCerrarSesion = document.getElementById(
        "cerrarSesion"
    );

    if (botonCerrarSesion) {

        botonCerrarSesion.addEventListener("click", function () {

            let claves = [
                "usuarioId",
                "nombre",
                "correo",
                "rol",
                "departamento",
                "puesto"
            ];

            claves.forEach(function (clave) {

                sessionStorage.removeItem(clave);

            });

            window.location.replace("login.html");

        });

    }


    /* =====================================
       CHAT FLOTANTE DEL EMPLEADO
       ===================================== */

    let botonAbrirChat = document.getElementById(
        "abrirChat"
    );

    let ventanaChat = document.getElementById(
        "ventanaChat"
    );

    let botonCerrarChat = document.getElementById(
        "cerrarChat"
    );

    if (botonAbrirChat && ventanaChat && botonCerrarChat) {


        /* =====================================
           ABRIR CHAT
           ===================================== */

        function abrirChat() {

            ventanaChat.hidden = false;

            botonAbrirChat.classList.add("chat-abierto");

            botonAbrirChat.setAttribute(
                "aria-expanded",
                "true"
            );

            botonCerrarChat.focus();

        }


        /* =====================================
           CERRAR CHAT
           ===================================== */

        function cerrarChat() {

            ventanaChat.hidden = true;

            botonAbrirChat.classList.remove("chat-abierto");

            botonAbrirChat.setAttribute(
                "aria-expanded",
                "false"
            );

            botonAbrirChat.focus();

        }

        botonAbrirChat.addEventListener("click", abrirChat);

        botonCerrarChat.addEventListener("click", cerrarChat);

        // Cerrar con Escape
        document.addEventListener("keydown", function (evento) {

            if (
                evento.key === "Escape" &&
                !ventanaChat.hidden
            ) {

                cerrarChat();

            }

        });


        /* =====================================
           ESCRIBIR Y MOSTRAR MENSAJES
           ===================================== */

        let formularioChat = document.getElementById(
            "formChatFlotante"
        );

        let campoMensaje = document.getElementById(
            "textoChatFlotante"
        );

        let contenedorMensajes = document.getElementById(
            "mensajesChat"
        );

        if (
            formularioChat &&
            campoMensaje &&
            contenedorMensajes
        ) {

            formularioChat.addEventListener("submit", function (evento) {

                evento.preventDefault();

                // Obtener el mensaje escrito
                let textoMensaje = campoMensaje.value.trim();

                // No permitir mensajes vacíos
                if (textoMensaje === "") {
                    return;
                }

                // Quitar el aviso inicial del chat
                let mensajeVacio = contenedorMensajes.querySelector(
                    ".chat-flotante-vacio"
                );

                if (mensajeVacio) {

                    mensajeVacio.remove();

                }

                // Crear la burbuja del mensaje
                let nuevoMensaje = document.createElement("div");

                nuevoMensaje.className = "chat-flotante-enviado";

                // Mostrar el texto sin interpretar HTML
                nuevoMensaje.textContent = textoMensaje;

                // Añadir mensaje a la conversación
                contenedorMensajes.appendChild(nuevoMensaje);

                // Limpiar el campo
                campoMensaje.value = "";

                // Mostrar el último mensaje
                contenedorMensajes.scrollTop =
                    contenedorMensajes.scrollHeight;

                // Volver a enfocar el campo
                campoMensaje.focus();

            });

        }

    }

});
