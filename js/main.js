
/* VESTAMANIA - ACCIONES v3 */
/* Demostración en el navegador con localStorage.
   La autenticación real necesitará Laravel. */

let paginaActual = window.location.pathname.split('/').pop();
let rolActual = sessionStorage.getItem('rol');

let paginasAdmin = [
    'admin.html',
    'departamentos.html',
    'empleados.html',
    'tareas.html',
    'mensajes-admin.html'
];

let paginasEmpleado = ['empleado.html', 'mensajes.html'];

if (
    (paginasAdmin.includes(paginaActual) && rolActual !== 'admin') ||
    (paginasEmpleado.includes(paginaActual) && rolActual !== 'empleado')
) {
    window.location.replace('login.html');
}

/* USUARIOS DE DEMOSTRACIÓN */

let usuariosDemo = [
    {
        id: '1',
        nombre: 'Administrador',
        correo: 'admin@vestamania.test',
        clave: 'Admin1234!',
        rol: 'admin',
        departamento: '',
        puesto: ''
    },
    {
        id: '101',
        nombre: 'Empleado de Almacen',
        correo: 'empleado@vestamania.test',
        clave: 'Empleado1234!',
        rol: 'empleado',
        departamento: 'Almacén',
        puesto: 'Operario de almacén'
    },
    {
        id: '102',
        nombre: 'Empleado de Ventas',
        correo: 'ventas@vestamania.test',
        clave: 'Ventas1234!',
        rol: 'empleado',
        departamento: 'Ventas',
        puesto: 'Comercial'
    },
    {
        id: '103',
        nombre: 'Empleado de Administración',
        correo: 'oficina@vestamania.test',
        clave: 'Oficina1234!',
        rol: 'empleado',
        departamento: 'Administración',
        puesto: 'Auxiliar administrativo'
    }
];

/* CLAVES DE ALMACENAMIENTO */

let claveDeptos = 'vestamania_demo_departamentos_2';
let claveEmpleados = 'vestamania_demo_empleados_2';
let claveTareas = 'vestamania_demo_tareas_2';
let claveMensajes = 'vestamania_demo_mensajes_2';

/* FUNCIONES GENERALES */

function leerDatos(clave, iniciales) {
    try {
        let datos = localStorage.getItem(clave);

        if (datos !== null) {
            let resultado = JSON.parse(datos);

            if (Array.isArray(resultado)) {
                return resultado;
            }
        }

        localStorage.setItem(clave, JSON.stringify(iniciales));
    } catch (error) {
        console.warn('Almacenamiento local no disponible:', error);
    }

    return iniciales;
}

function guardarDatos(clave, datos) {
    try {
        localStorage.setItem(clave, JSON.stringify(datos));
    } catch (error) {
        alert('No se pudieron guardar los cambios en este navegador.');
    }
}

function siguienteId(lista) {
    return lista.reduce(function (mayor, registro) {
        return Math.max(mayor, Number(registro.id) || 0);
    }, 0) + 1;
}

function elemento(etiqueta, clase, texto) {
    let nodo = document.createElement(etiqueta);

    if (clase) {
        nodo.className = clase;
    }

    if (texto !== undefined) {
        nodo.textContent = texto;
    }

    return nodo;
}

function celda(fila, texto) {
    let td = elemento('td', '', texto);
    fila.appendChild(td);
    return td;
}

/* BOTONES DE ACCIONES */

function botonAccion(texto, clase, funcion) {
    let boton = elemento('button', 'btn-accion ' + clase);

    boton.type = 'button';
    boton.disabled = false;
    boton.style.cursor = 'pointer';
    boton.style.pointerEvents = 'auto';
    boton.style.opacity = '1';
    boton.title = texto;
    boton.setAttribute('aria-label', texto);

    let icono = 'trash';

    if (texto === 'Editar') {
        icono = 'pencil-square';
    } else if (texto === 'Reactivar') {
        icono = 'arrow-clockwise';
    } else if (texto === 'Dar de baja') {
        icono = 'person-x';
    }

    boton.appendChild(elemento('i', 'bi bi-' + icono));
    boton.addEventListener('click', funcion);

    return boton;
}

/* MODALES DE BOOTSTRAP */

function modalMostrar(id) {
    let nodo = document.getElementById(id);

    if (nodo && window.bootstrap) {
        bootstrap.Modal.getOrCreateInstance(nodo).show();
    }
}

function modalCerrar(id) {
    let nodo = document.getElementById(id);

    if (nodo && window.bootstrap) {
        bootstrap.Modal.getOrCreateInstance(nodo).hide();
    }
}

function aviso(id, texto, tipo) {
    let caja = document.getElementById(id);

    if (!caja) {
        return;
    }

    caja.className = 'alert alert-' + (tipo || 'info') + ' mt-3';
    caja.textContent = texto;
}

/* DATOS DE DEPARTAMENTOS */

let departamentos = leerDatos(claveDeptos, [
    {
        id: 1,
        nombre: 'Almacén',
        descripcion: 'Control de existencias y mercancía'
    },
    {
        id: 2,
        nombre: 'Ventas',
        descripcion: 'Gestión comercial y atención al cliente'
    },
    {
        id: 3,
        nombre: 'Administración',
        descripcion: 'Gestión administrativa'
    },
    {
        id: 4,
        nombre: 'Recursos Humanos',
        descripcion: 'Gestión del personal'
    }
]);

/* DATOS DE EMPLEADOS */

let empleados = leerDatos(claveEmpleados, [
    {
        id: 101,
        nombre: 'Empleado de',
        apellidos: 'Almacén',
        correo: 'empleado@vestamania.test',
        departamento: 'Almacén',
        estado: 'activo'
    },
    {
        id: 102,
        nombre: 'Empleado de',
        apellidos: 'Ventas',
        correo: 'ventas@vestamania.test',
        departamento: 'Ventas',
        estado: 'activo'
    },
    {
        id: 103,
        nombre: 'Empleado de',
        apellidos: 'Administración',
        correo: 'oficina@vestamania.test',
        departamento: 'Administración',
        estado: 'activo'
    }
]);

/* DATOS DE TAREAS */

let tareas = leerDatos(claveTareas, [
    {
        id: 1,
        usuarioId: '101',
        departamento: 'Almacén',
        titulo: 'Revisar inventario del almacén',
        descripcion: 'Comprobar existencias y productos pendientes.',
        prioridad: 'Media',
        estado: 'pendiente',
        fecha: ''
    },
    {
        id: 2,
        usuarioId: '101',
        departamento: 'Almacén',
        titulo: 'Organizar recepción de mercancía',
        descripcion: 'Registrar la mercancía recibida.',
        prioridad: 'Baja',
        estado: 'finalizada',
        fecha: ''
    },
    {
        id: 3,
        usuarioId: '102',
        departamento: 'Ventas',
        titulo: 'Actualizar catálogo de productos',
        descripcion: 'Revisar precios y descripciones.',
        prioridad: 'Alta',
        estado: 'en_curso',
        fecha: ''
    },
    {
        id: 4,
        usuarioId: '102',
        departamento: 'Ventas',
        titulo: 'Preparar listado comercial',
        descripcion: 'Revisar productos de campañas anteriores.',
        prioridad: 'Media',
        estado: 'finalizada',
        fecha: ''
    },
    {
        id: 5,
        usuarioId: '103',
        departamento: 'Administración',
        titulo: 'Revisar facturas',
        descripcion: 'Comprobar facturas pendientes.',
        prioridad: 'Media',
        estado: 'en_curso',
        fecha: ''
    },
    {
        id: 6,
        usuarioId: '103',
        departamento: 'Administración',
        titulo: 'Archivar documentación',
        descripcion: 'Organizar documentos administrativos.',
        prioridad: 'Baja',
        estado: 'finalizada',
        fecha: ''
    }
]);

let mensajes = leerDatos(claveMensajes, []);

/* INICIAR EVENTOS CUANDO CARGUE EL HTML */

document.addEventListener('DOMContentLoaded', function () {
    let $ = function (id) {
        return document.getElementById(id);
    };

    let cuentaId = sessionStorage.getItem('usuarioId');

    /* LOGIN */

    if ($('formLogin')) {
        $('formLogin').addEventListener('submit', function (evento) {
            evento.preventDefault();

            let correo = $('correoLogin').value.trim().toLowerCase();
            let clave = $('contrasenaLogin').value;
            let rol = $('rolLogin').value;

            let usuario = usuariosDemo.find(function (u) {
                return u.correo === correo && u.clave === clave;
            });

            if (!usuario || usuario.rol !== rol) {
                aviso(
                    'avisoLogin',
                    'Credenciales incorrectas o rol no correspondiente.',
                    'danger'
                );
                return;
            }

            ['id', 'nombre', 'correo', 'rol', 'departamento', 'puesto']
                .forEach(function (campo) {
                    sessionStorage.setItem(
                        campo === 'id' ? 'usuarioId' : campo,
                        usuario[campo]
                    );
                });

            window.location.href = usuario.rol === 'admin'
                ? 'admin.html'
                : 'empleado.html';
        });
    }

    /* MOSTRAR Y OCULTAR CONTRASEÑAS */

    document.querySelectorAll('[data-toggle-password]')
        .forEach(function (boton) {
            boton.addEventListener('click', function () {
                let campo = $(
                    boton.getAttribute('data-toggle-password')
                );

                if (!campo) {
                    return;
                }

                let mostrar = campo.type === 'password';
                campo.type = mostrar ? 'text' : 'password';

                boton.setAttribute(
                    'aria-label',
                    mostrar ? 'Ocultar contraseña' : 'Mostrar contraseña'
                );

                let icono = boton.querySelector('i');

                if (icono) {
                    icono.className = mostrar
                        ? 'bi bi-eye-slash'
                        : 'bi bi-eye';
                }
            });
        });

    /* REGISTRO */

    function cambiarCamposRegistro() {
        if (!$('registroRol')) {
            return;
        }

        let rol = $('registroRol').value;
        let empleado = rol === 'empleado';

        if ($('datosEmpleadoRegistro')) {
            $('datosEmpleadoRegistro').hidden = !empleado;
        }

        if ($('registroDepartamento')) {
            $('registroDepartamento').required = empleado;
        }

        if ($('registroPuesto')) {
            $('registroPuesto').required = empleado;
        }

        if ($('avisoRolRegistro')) {
            $('avisoRolRegistro').textContent = empleado
                ? 'Indica tu departamento y puesto.'
                : 'La empresa debe autorizar las cuentas de administrador.';
        }

        if ($('avisoSeguridadRegistro')) {
            $('avisoSeguridadRegistro').textContent =
                'Este formulario solo valida los datos. ' +
                'El alta real requiere autorización en Laravel.';
        }
    }

    if ($('registroRol')) {
        $('registroRol').addEventListener(
            'change',
            cambiarCamposRegistro
        );
        cambiarCamposRegistro();
    }

    if ($('formRegistro')) {
        $('formRegistro').addEventListener('submit', function (evento) {
            evento.preventDefault();

            if (
                $('registroContrasena').value !==
                $('registroConfirmar').value
            ) {
                aviso(
                    'avisoRegistro',
                    'Las contraseñas no coinciden.',
                    'danger'
                );
            } else {
                aviso(
                    'avisoRegistro',
                    'Solicitud comprobada. No se ha creado ninguna ' +
                    'cuenta: falta conectar Laravel.',
                    'info'
                );
            }
        });
    }

    /* CERRAR SESIÓN */

    if ($('cerrarSesion')) {
        $('cerrarSesion').addEventListener('click', function () {
            [
                'usuarioId',
                'nombre',
                'correo',
                'rol',
                'departamento',
                'puesto'
            ].forEach(function (campo) {
                sessionStorage.removeItem(campo);
            });

            window.location.replace('login.html');
        });
    }

    /* PERFIL */

    ['Nombre', 'Correo', 'Departamento', 'Puesto']
        .forEach(function (campo) {
            if ($('perfil' + campo)) {
                let clave = campo.toLowerCase();

                $('perfil' + campo).textContent =
                    sessionStorage.getItem(clave) || 'Sin asignar';
            }
        });

    /* DESPLEGABLES DE DEPARTAMENTOS */

    function cargarDepartamentos(select, placeholder) {
        if (!select) {
            return;
        }

        let anterior = select.value;
        select.replaceChildren();

        if (placeholder) {
            let op = elemento('option', '', placeholder);
            op.value = '';
            select.appendChild(op);
        }

        departamentos.forEach(function (d) {
            let op = elemento('option', '', d.nombre);
            op.value = d.nombre;
            select.appendChild(op);
        });

        if (anterior) {
            select.value = anterior;
        }
    }

    /* COMPATIBILIDAD CON FORMULARIOS ANTERIORES */

    function prepararFormulario(idModal, idFormulario, idOculto) {
        let modal = $(idModal);

        let formulario = $(idFormulario) ||
            (modal ? modal.querySelector('form') : null);

        if (!formulario) {
            return null;
        }

        formulario.id = idFormulario;

        if (idOculto && !$(idOculto)) {
            let campo = document.createElement('input');
            campo.type = 'hidden';
            campo.id = idOculto;
            formulario.prepend(campo);
        }

        let guardar = formulario.querySelector(
            '.modal-footer .btn-vestamania'
        );

        if (guardar) {
            guardar.type = 'submit';
            guardar.disabled = false;
            guardar.removeAttribute('enabled');
        }

        return formulario;
    }

    /* =====================================
       DEPARTAMENTOS
       ===================================== */

    let formularioDeptos = prepararFormulario(
        'modalDepartamento',
        'formDepartamento',
        'departamentoId'
    );

    function pintarDepartamentos() {
        if (!$('tablaDepartamentos')) {
            return;
        }

        let cuerpo = $('tablaDepartamentos');
        cuerpo.replaceChildren();

        let q = $('buscarDepartamento')
            ? $('buscarDepartamento').value.trim().toLowerCase()
            : '';

        let visibles = departamentos.filter(function (d) {
            return (d.nombre + ' ' + d.descripcion)
                .toLowerCase()
                .includes(q);
        });

        visibles.forEach(function (d) {
            let tr = elemento('tr');

            celda(tr, d.nombre);
            celda(tr, d.descripcion);

            let acciones = celda(tr, '');
            acciones.className = 'text-end';

            /* EDITAR */

            acciones.appendChild(
                botonAccion('Editar', 'btn-editar', function () {
                    $('departamentoId').value = d.id;
                    $('nombreDepartamento').value = d.nombre;
                    $('descripcionDepartamento').value = d.descripcion;

                    $('tituloModalDepartamento').textContent =
                        'Editar departamento';

                    modalMostrar('modalDepartamento');
                })
            );

            /* ELIMINAR */

            acciones.appendChild(
                botonAccion('Eliminar', 'btn-eliminar', function () {
                    if (!confirm(
                        '¿Eliminar este departamento de la demostración?'
                    )) {
                        return;
                    }

                    departamentos = departamentos.filter(function (item) {
                        return item.id !== d.id;
                    });

                    guardarDatos(claveDeptos, departamentos);
                    pintarDepartamentos();
                })
            );

            cuerpo.appendChild(tr);
        });

        if ($('mensajeVacio')) {
            $('mensajeVacio').hidden = visibles.length > 0;
        }

        if ($('estadoAcciones')) {
            $('estadoAcciones').textContent =
                'Acciones activas: editar, eliminar, buscar y guardar.';
        }
    }

    if (formularioDeptos) {
        let abrirNuevoDepartamento = document.querySelector(
            '[data-bs-target="#modalDepartamento"]'
        );

        if (abrirNuevoDepartamento) {
            abrirNuevoDepartamento.addEventListener(
                'click',
                function () {
                    $('formDepartamento').reset();
                    $('departamentoId').value = '';

                    $('tituloModalDepartamento').textContent =
                        'Nuevo departamento';
                }
            );
        }

        $('formDepartamento').addEventListener('submit', function (evento) {
            evento.preventDefault();

            let id = $('departamentoId').value;
            let nombre = $('nombreDepartamento').value.trim();
            let descripcion = $('descripcionDepartamento').value.trim();

            if (!nombre) {
                return;
            }

            let duplicado = departamentos.some(function (d) {
                return d.nombre.toLowerCase() === nombre.toLowerCase() &&
                    String(d.id) !== id;
            });

            if (duplicado) {
                alert('Ya existe un departamento con ese nombre.');
                return;
            }

            let existente = departamentos.find(function (d) {
                return String(d.id) === id;
            });

            if (existente) {
                existente.nombre = nombre;
                existente.descripcion = descripcion;
            } else {
                departamentos.push({
                    id: siguienteId(departamentos),
                    nombre: nombre,
                    descripcion: descripcion
                });
            }

            guardarDatos(claveDeptos, departamentos);
            modalCerrar('modalDepartamento');
            pintarDepartamentos();
        });

        if ($('buscarDepartamento')) {
            $('buscarDepartamento').addEventListener(
                'input',
                pintarDepartamentos
            );
        }

        pintarDepartamentos();
    }

    /* =====================================
       EMPLEADOS
       ===================================== */

    let formularioEmpleados = prepararFormulario(
        'modalEmpleado',
        'formEmpleado',
        'empleadoId'
    );

    function pintarEmpleados() {
        let cuerpo = $('tablaEmpleados') ||
            document.querySelector('.vm-panel table tbody');

        if (!cuerpo) {
            return;
        }

        if (!cuerpo.id) {
            cuerpo.id = 'tablaEmpleados';
        }

        let q = $('buscarEmpleado')
            ? $('buscarEmpleado').value.trim().toLowerCase()
            : '';

        cuerpo.replaceChildren();

        let visibles = empleados.filter(function (e) {
            return [
                e.nombre,
                e.apellidos,
                e.correo,
                e.departamento
            ].join(' ').toLowerCase().includes(q);
        });

        visibles.forEach(function (e) {
            let tr = elemento('tr');

            celda(tr, e.nombre + ' ' + e.apellidos);
            celda(tr, e.correo);
            celda(tr, e.departamento);

            let estado = celda(tr, '');

            estado.appendChild(
                elemento(
                    'span',
                    'badge ' + (
                        e.estado === 'activo'
                            ? 'badge-activo'
                            : 'badge-inactivo'
                    ),
                    e.estado === 'activo' ? 'Activo' : 'Inactivo'
                )
            );

            let acciones = celda(tr, '');
            acciones.className = 'text-end';

            /* EDITAR */

            acciones.appendChild(
                botonAccion('Editar', 'btn-editar', function () {
                    $('empleadoId').value = e.id;
                    $('nombreEmpleado').value = e.nombre;
                    $('apellidosEmpleado').value = e.apellidos;
                    $('correoEmpleado').value = e.correo;
                    $('departamentoEmpleado').value = e.departamento;
                    $('estadoEmpleado').value = e.estado;

                    $('tituloModalEmpleado').textContent =
                        'Editar empleado';

                    modalMostrar('modalEmpleado');
                })
            );

            /* ELIMINAR */

            acciones.appendChild(
                botonAccion('Eliminar', 'btn-eliminar', function () {
                    let confirmar = window.confirm(
                        '¿Eliminar a ' + e.nombre + ' ' +
                        e.apellidos + ' de la demostración?'
                    );

                    if (!confirmar) {
                        return;
                    }

                    empleados = empleados.filter(function (registro) {
                        return String(registro.id) !== String(e.id);
                    });

                    tareas.forEach(function (tarea) {
                        if (String(tarea.usuarioId) === String(e.id)) {
                            tarea.usuarioId = '';
                        }
                    });

                    guardarDatos(claveEmpleados, empleados);
                    guardarDatos(claveTareas, tareas);
                    pintarEmpleados();
                })
            );

            cuerpo.appendChild(tr);
        });

        if (!visibles.length) {
            let tr = elemento('tr');
            let td = celda(
                tr,
                'No hay empleados que coincidan con la búsqueda.'
            );

            td.colSpan = 5;
            td.className = 'text-center py-4';
            cuerpo.appendChild(tr);
        }

        if ($('estadoAcciones')) {
            $('estadoAcciones').textContent =
                'Acciones activas: editar, eliminar, buscar y guardar.';
        }
    }

    if (formularioEmpleados) {
        cargarDepartamentos(
            $('departamentoEmpleado'),
            'Seleccionar departamento'
        );

        let abrirNuevoEmpleado = document.querySelector(
            '[data-bs-target="#modalEmpleado"]'
        );

        if (abrirNuevoEmpleado) {
            abrirNuevoEmpleado.addEventListener('click', function () {
                $('formEmpleado').reset();
                $('empleadoId').value = '';
                $('tituloModalEmpleado').textContent = 'Nuevo empleado';
            });
        }

        $('formEmpleado').addEventListener('submit', function (evento) {
            evento.preventDefault();

            let id = $('empleadoId').value;
            let nombre = $('nombreEmpleado').value.trim();
            let apellidos = $('apellidosEmpleado').value.trim();
            let correo = $('correoEmpleado').value.trim().toLowerCase();
            let departamento = $('departamentoEmpleado').value;
            let estado = $('estadoEmpleado').value;

            if (!nombre || !apellidos || !correo || !departamento) {
                return;
            }

            let duplicado = empleados.some(function (e) {
                return e.correo === correo && String(e.id) !== id;
            });

            if (duplicado) {
                alert('Ya existe un empleado con ese correo.');
                return;
            }

            let registro = empleados.find(function (e) {
                return String(e.id) === id;
            });

            if (registro) {
                Object.assign(registro, {
                    nombre: nombre,
                    apellidos: apellidos,
                    correo: correo,
                    departamento: departamento,
                    estado: estado
                });
            } else {
                empleados.push({
                    id: siguienteId(empleados),
                    nombre: nombre,
                    apellidos: apellidos,
                    correo: correo,
                    departamento: departamento,
                    estado: estado
                });
            }

            guardarDatos(claveEmpleados, empleados);
            modalCerrar('modalEmpleado');
            pintarEmpleados();
        });

        if ($('buscarEmpleado')) {
            $('buscarEmpleado').addEventListener('input', pintarEmpleados);
        }

        pintarEmpleados();
    }

    /* =====================================
       TAREAS DEL ADMINISTRADOR
       ===================================== */

    function llenarUsuariosTarea(seleccionado) {
        if (!$('usuarioTarea')) {
            return;
        }

        let depto = $('departamentoTarea').value;
        let selector = $('usuarioTarea');
        selector.replaceChildren();

        let vacio = elemento('option', '', 'Sin asignar');
        vacio.value = '';
        selector.appendChild(vacio);

        empleados.filter(function (e) {
            return e.estado === 'activo' && e.departamento === depto;
        }).forEach(function (e) {
            let op = elemento(
                'option',
                '',
                e.nombre + ' ' + e.apellidos
            );

            op.value = String(e.id);
            selector.appendChild(op);
        });

        if (seleccionado) {
            selector.value = String(seleccionado);
        }
    }

    function pintarTareas() {
        if (!$('tablaTareas')) {
            return;
        }

        let cuerpo = $('tablaTareas');
        cuerpo.replaceChildren();

        let q = $('buscarTarea')
            ? $('buscarTarea').value.trim().toLowerCase()
            : '';

        let depto = $('filtroDepartamentoTareas')
            ? $('filtroDepartamentoTareas').value
            : '';

        let visibles = tareas.filter(function (t) {
            return (!depto || t.departamento === depto) &&
                (t.titulo + ' ' + t.descripcion)
                    .toLowerCase()
                    .includes(q);
        });

        visibles.forEach(function (t) {
            let tr = elemento('tr');

            celda(tr, t.titulo);
            celda(tr, t.departamento);

            let estado = celda(tr, '');

            let claseEstado = t.estado === 'en_curso'
                ? 'curso'
                : t.estado === 'finalizada'
                    ? 'finalizada'
                    : 'pendiente';

            let textoEstado = t.estado === 'en_curso'
                ? 'En curso'
                : t.estado === 'finalizada'
                    ? 'Finalizada'
                    : 'Pendiente';

            estado.appendChild(
                elemento(
                    'span',
                    'badge estado-' + claseEstado,
                    textoEstado
                )
            );

            let prio = celda(tr, '');

            prio.appendChild(
                elemento(
                    'span',
                    'prioridad-' + t.prioridad.toLowerCase(),
                    t.prioridad
                )
            );

            let acciones = celda(tr, '');
            acciones.className = 'text-end';

            acciones.appendChild(
                botonAccion('Editar', 'btn-editar', function () {
                    $('tareaId').value = t.id;
                    $('nombreTarea').value = t.titulo;
                    $('descripcionTarea').value = t.descripcion || '';
                    $('departamentoTarea').value = t.departamento;
                    $('prioridadTarea').value = t.prioridad;
                    $('fechaTarea').value = t.fecha || '';

                    llenarUsuariosTarea(t.usuarioId);

                    $('tituloModalTarea').textContent = 'Editar tarea';
                    modalMostrar('modalTarea');
                })
            );

            acciones.appendChild(
                botonAccion('Eliminar', 'btn-eliminar', function () {
                    if (!confirm(
                        '¿Eliminar esta tarea de la demostración?'
                    )) {
                        return;
                    }

                    tareas = tareas.filter(function (item) {
                        return item.id !== t.id;
                    });

                    guardarDatos(claveTareas, tareas);
                    pintarTareas();
                })
            );

            cuerpo.appendChild(tr);
        });

        if (!visibles.length) {
            let tr = elemento('tr');
            let td = celda(
                tr,
                'No hay tareas que coincidan con los filtros.'
            );

            td.colSpan = 5;
            td.className = 'text-center py-4';
            cuerpo.appendChild(tr);
        }

        [
            ['resumenPendientes', 'pendiente'],
            ['resumenCurso', 'en_curso'],
            ['resumenFinalizadas', 'finalizada']
        ].forEach(function (par) {
            if ($(par[0])) {
                $(par[0]).textContent = tareas.filter(function (t) {
                    return t.estado === par[1];
                }).length;
            }
        });
    }

    if ($('formTarea')) {
        cargarDepartamentos(
            $('departamentoTarea'),
            'Seleccionar departamento'
        );

        if ($('filtroDepartamentoTareas')) {
            cargarDepartamentos(
                $('filtroDepartamentoTareas'),
                'Todos los departamentos'
            );

            $('filtroDepartamentoTareas').addEventListener(
                'change',
                pintarTareas
            );
        }

        if ($('buscarTarea')) {
            $('buscarTarea').addEventListener('input', pintarTareas);
        }

        $('departamentoTarea').addEventListener('change', function () {
            llenarUsuariosTarea('');
        });

        let abrirNuevaTarea = document.querySelector(
            '[data-bs-target="#modalTarea"]'
        );

        if (abrirNuevaTarea) {
            abrirNuevaTarea.addEventListener('click', function () {
                $('formTarea').reset();
                $('tareaId').value = '';
                $('tituloModalTarea').textContent = 'Nueva tarea';
                llenarUsuariosTarea('');
            });
        }

        $('formTarea').addEventListener('submit', function (evento) {
            evento.preventDefault();

            let id = $('tareaId').value;
            let titulo = $('nombreTarea').value.trim();
            let descripcion = $('descripcionTarea').value.trim();
            let departamento = $('departamentoTarea').value;
            let usuarioId = $('usuarioTarea').value;
            let prioridad = $('prioridadTarea').value;
            let fecha = $('fechaTarea').value;

            if (!titulo || !departamento) {
                return;
            }

            let tarea = tareas.find(function (t) {
                return String(t.id) === id;
            });

            if (tarea) {
                Object.assign(tarea, {
                    titulo: titulo,
                    descripcion: descripcion,
                    departamento: departamento,
                    usuarioId: usuarioId,
                    prioridad: prioridad,
                    fecha: fecha
                });
            } else {
                tareas.push({
                    id: siguienteId(tareas),
                    titulo: titulo,
                    descripcion: descripcion,
                    departamento: departamento,
                    usuarioId: usuarioId,
                    prioridad: prioridad,
                    fecha: fecha,
                    estado: 'pendiente'
                });
            }

            guardarDatos(claveTareas, tareas);
            modalCerrar('modalTarea');
            pintarTareas();
        });

        pintarTareas();
    }

    /* =====================================
       TAREAS DEL EMPLEADO
       ===================================== */

    function pintarTareasEmpleado() {
        if (!$('tituloTareaActual')) {
            return;
        }

        let usuarioId = sessionStorage.getItem('usuarioId');

        let propias = tareas.filter(function (t) {
            return String(t.usuarioId) === usuarioId;
        });

        let actual = propias.find(function (t) {
            return t.estado === 'pendiente' ||
                t.estado === 'en_curso';
        });

        $('tituloTareaActual').textContent = actual
            ? actual.titulo
            : 'Sin tarea actual';

        if ($('descripcionTareaActual')) {
            $('descripcionTareaActual').textContent = actual
                ? actual.descripcion
                : 'No tienes tareas asignadas en este momento.';
        }

        if ($('departamentoTareaActual')) {
            $('departamentoTareaActual').textContent =
                'Departamento: ' + (
                    actual
                        ? actual.departamento
                        : sessionStorage.getItem('departamento') ||
                          'Sin asignar'
                );
        }

        if ($('prioridadTareaActual')) {
            $('prioridadTareaActual').textContent =
                'Prioridad: ' + (actual ? actual.prioridad : '—');
        }

        if ($('estadoTareaActual')) {
            $('estadoTareaActual').textContent = actual
                ? actual.estado === 'pendiente'
                    ? 'Pendiente'
                    : 'En curso'
                : 'Sin asignar';

            $('estadoTareaActual').className = actual
                ? 'badge estado-' + (
                    actual.estado === 'pendiente'
                        ? 'pendiente'
                        : 'curso'
                )
                : 'badge text-bg-secondary';
        }

        if ($('finalizarTarea')) {
            $('finalizarTarea').disabled = !actual;
        }

        if ($('guardarPendiente')) {
            $('guardarPendiente').disabled = !actual;
        }

        [
            [
                'listaPendientes',
                'pendiente',
                'No tienes tareas pendientes.'
            ],
            [
                'listaFinalizadas',
                'finalizada',
                'No tienes tareas finalizadas.'
            ]
        ].forEach(function (par) {
            if (!$(par[0])) {
                return;
            }

            $(par[0]).replaceChildren();

            let lista = propias.filter(function (t) {
                return t.estado === par[1];
            });

            if (!lista.length) {
                $(par[0]).appendChild(
                    elemento(
                        'div',
                        'empleado-caja empleado-estado-vacio admin-muted',
                        par[2]
                    )
                );
                return;
            }

            lista.forEach(function (t) {
                let caja = elemento('article', 'empleado-caja');

                caja.appendChild(
                    elemento('h3', 'h5 fw-bold', t.titulo)
                );

                caja.appendChild(
                    elemento('p', 'admin-muted', t.descripcion)
                );

                caja.appendChild(
                    elemento(
                        'p',
                        'small admin-muted mb-0',
                        'Departamento: ' + t.departamento +
                        ' · Prioridad: ' + t.prioridad
                    )
                );

                $(par[0]).appendChild(caja);
            });
        });
    }

    if ($('tituloTareaActual')) {
        pintarTareasEmpleado();

        $('finalizarTarea').addEventListener('click', function () {
            let actual = tareas.find(function (t) {
                return String(t.usuarioId) === cuentaId &&
                    (
                        t.estado === 'pendiente' ||
                        t.estado === 'en_curso'
                    );
            });

            if (!actual) {
                return;
            }

            actual.estado = 'finalizada';

            guardarDatos(claveTareas, tareas);
            pintarTareasEmpleado();
        });

        $('guardarPendiente').addEventListener('click', function () {
            let actual = tareas.find(function (t) {
                return String(t.usuarioId) === cuentaId &&
                    (
                        t.estado === 'pendiente' ||
                        t.estado === 'en_curso'
                    );
            });

            if (!actual) {
                return;
            }

            if (actual.estado === 'pendiente') {
                alert('Esta tarea ya está pendiente.');
                return;
            }

            actual.estado = 'pendiente';

            guardarDatos(claveTareas, tareas);
            pintarTareasEmpleado();
        });
    }

    /* =====================================
       MENSAJES
       ===================================== */

    function guardarMensaje(usuarioId, remitente, texto) {
        if (!usuarioId || !texto.trim()) {
            return;
        }

        mensajes.push({
            id: Date.now(),
            usuarioId: String(usuarioId),
            remitente: remitente,
            texto: texto.trim()
        });

        guardarDatos(claveMensajes, mensajes);
    }

    function pintarMensajes(contenedor, usuarioId, rol, flotante) {
        if (!contenedor) {
            return;
        }

        contenedor.replaceChildren();

        let lista = mensajes.filter(function (m) {
            return String(m.usuarioId) === String(usuarioId);
        });

        if (!lista.length) {
            contenedor.appendChild(
                elemento(
                    'div',
                    flotante
                        ? 'chat-flotante-vacio'
                        : 'chat-sin-mensajes',
                    'Todavía no hay mensajes.'
                )
            );
            return;
        }

        lista.forEach(function (m) {
            let mio = m.remitente === rol;

            let clase = flotante
                ? mio
                    ? 'chat-flotante-enviado'
                    : 'chat-flotante-recibido'
                : mio
                    ? 'chat-burbuja-enviada'
                    : 'chat-burbuja-recibida';

            contenedor.appendChild(
                elemento('div', clase, m.texto)
            );
        });

        contenedor.scrollTop = contenedor.scrollHeight;
    }

    /* MENSAJES DEL EMPLEADO */

    if ($('formMensaje')) {
        pintarMensajes(
            $('listaMensajes'),
            cuentaId,
            'empleado',
            false
        );

        $('formMensaje').addEventListener('submit', function (evento) {
            evento.preventDefault();

            let texto = $('mensaje').value.trim();

            if (!texto) {
                return;
            }

            guardarMensaje(cuentaId, 'empleado', texto);
            $('mensaje').value = '';

            pintarMensajes(
                $('listaMensajes'),
                cuentaId,
                'empleado',
                false
            );
        });
    }

    /* MENSAJES DEL ADMINISTRADOR */

    let conversacionActual = '';

    function pintarConversaciones() {
        if (!$('listaConversaciones')) {
            return;
        }

        let q = $('buscarConversacion')
            ? $('buscarConversacion').value.toLowerCase().trim()
            : '';

        $('listaConversaciones').replaceChildren();

        usuariosDemo.filter(function (u) {
            return u.rol === 'empleado' &&
                (u.nombre + ' ' + u.correo)
                    .toLowerCase()
                    .includes(q);
        }).forEach(function (u) {
            let boton = elemento(
                'button',
                'conversacion-item w-100 border-0 text-start' +
                (
                    conversacionActual === u.id
                        ? ' seleccionado'
                        : ''
                ),
                u.nombre
            );

            boton.type = 'button';

            boton.addEventListener('click', function () {
                conversacionActual = u.id;

                $('nombreConversacion').textContent = u.nombre;
                $('mensajeAdmin').disabled = false;
                $('mensajeAdmin').placeholder = 'Escribe un mensaje...';

                $('formMensajeAdmin')
                    .querySelector('button[type="submit"]')
                    .disabled = false;

                pintarMensajes(
                    $('mensajesAdministrador'),
                    conversacionActual,
                    'admin',
                    false
                );

                pintarConversaciones();
            });

            $('listaConversaciones').appendChild(boton);
        });
    }

    if ($('formMensajeAdmin')) {
        pintarConversaciones();

        if ($('buscarConversacion')) {
            $('buscarConversacion').addEventListener(
                'input',
                pintarConversaciones
            );
        }

        $('formMensajeAdmin').addEventListener('submit', function (evento) {
            evento.preventDefault();

            if (!conversacionActual) {
                return;
            }

            let texto = $('mensajeAdmin').value.trim();

            if (!texto) {
                return;
            }

            guardarMensaje(conversacionActual, 'admin', texto);
            $('mensajeAdmin').value = '';

            pintarMensajes(
                $('mensajesAdministrador'),
                conversacionActual,
                'admin',
                false
            );
        });
    }

    /* =====================================
       CHAT FLOTANTE
       ===================================== */

    if ($('abrirChat') && $('cerrarChat') && $('ventanaChat')) {
        let abrir = $('abrirChat');
        let cerrar = $('cerrarChat');
        let ventana = $('ventanaChat');

        function cambiarChat(abierto) {
            ventana.hidden = !abierto;
            abrir.classList.toggle('chat-abierto', abierto);
            abrir.setAttribute('aria-expanded', String(abierto));

            (abierto ? cerrar : abrir).focus();
        }

        abrir.addEventListener('click', function () {
            cambiarChat(true);
        });

        cerrar.addEventListener('click', function () {
            cambiarChat(false);
        });

        document.addEventListener('keydown', function (evento) {
            if (evento.key === 'Escape' && !ventana.hidden) {
                cambiarChat(false);
            }
        });

        pintarMensajes(
            $('mensajesChat'),
            cuentaId,
            'empleado',
            true
        );

        $('formChatFlotante').addEventListener('submit', function (evento) {
            evento.preventDefault();

            let texto = $('textoChatFlotante').value.trim();

            if (!texto) {
                return;
            }

            guardarMensaje(cuentaId, 'empleado', texto);
            $('textoChatFlotante').value = '';

            pintarMensajes(
                $('mensajesChat'),
                cuentaId,
                'empleado',
                true
            );

            $('textoChatFlotante').focus();
        });
    }

    /* SINCRONIZAR CAMBIOS ENTRE PESTAÑAS */

    window.addEventListener('storage', function (evento) {
        if (evento.key === claveMensajes) {
            mensajes = leerDatos(claveMensajes, []);

            if ($('listaMensajes')) {
                pintarMensajes(
                    $('listaMensajes'),
                    cuentaId,
                    'empleado',
                    false
                );
            }

            if ($('mensajesChat')) {
                pintarMensajes(
                    $('mensajesChat'),
                    cuentaId,
                    'empleado',
                    true
                );
            }

            if ($('mensajesAdministrador') && conversacionActual) {
                pintarMensajes(
                    $('mensajesAdministrador'),
                    conversacionActual,
                    'admin',
                    false
                );
            }
        }

        if (evento.key === claveTareas) {
            tareas = leerDatos(claveTareas, []);
            pintarTareas();
            pintarTareasEmpleado();
        }
    });
});

console.info('Vestamania acciones v3: main.js cargado');
