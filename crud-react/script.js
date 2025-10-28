// === ELEMENTOS DEL DOM ===
const sesionForm = document.getElementById("sesion-form");
const sesionActiva = document.getElementById("sesion-activa");
const inputUsuario = document.getElementById("nombre-usuario");
const saludoUsuario = document.getElementById("usuario-saludo");
const btnIniciar = document.getElementById("iniciar-sesion");
const btnCerrar = document.getElementById("cerrar-sesion");

// === ELEMENTOS DEL MODAL ===
const modal = document.getElementById("modal-clasificacion");
const tiposBtns = document.querySelectorAll(".tipo-tarea");

// Mapeo de tipos de tarea a iconos SVG
const ICONOS_TAREA = {
  universidad: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 3L1 9L12 15L21 10.09V17H23V9M5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z" fill="currentColor"/>
  </svg>`,
  deporte: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM6.5 17.5L14.01 14.01L17.5 6.5L9.99 9.99L6.5 17.5Z" fill="currentColor"/>
  </svg>`,
  urgente: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L1 21H23L12 2ZM12 6L19.53 19H4.47L12 6ZM11 10V14H13V10H11ZM11 16V18H13V16H11Z" fill="currentColor"/>
  </svg>`,
  rutina: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12.5 7H11V13L16.2 16.2L17 14.9L12.5 12.2V7Z" fill="currentColor"/>
  </svg>`,
  otros: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 5V19H5V5H19ZM19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM14.14 11.86L11.14 15.73L9 13.14L6 17H18L14.14 11.86Z" fill="currentColor"/>
  </svg>`
};
// Título de bienvenida dentro de la sección de sesión
const tituloBienvenido = document.querySelector('#seccion-sesion h2');

// === MANEJO DE ERRORES ===
function handleStorageError(error) {
    console.error('Error accessing storage:', error);
    alert('Hubo un error al acceder al almacenamiento. Por favor, intente de nuevo.');
}

const seccionTareas = document.getElementById("seccion-tareas");
const inputTarea = document.getElementById("nueva-tarea");
const btnAgregar = document.getElementById("agregar-tarea");
const listaTareas = document.getElementById("lista-tareas");

// === EVENTOS ===
document.addEventListener("DOMContentLoaded", verificarSesion);
btnIniciar.addEventListener("click", iniciarSesion);
btnCerrar.addEventListener("click", cerrarSesion);
btnAgregar.addEventListener("click", agregarTarea);

// Guardar displays originales y preparar animaciones (se hace inmediatamente porque

function saveOriginalDisplay(el, fallback) {
  if (!el) return;
  const comp = getComputedStyle(el).display;
  
  el.dataset.originalDisplay = (comp && comp !== 'none') ? comp : (fallback || 'block');
}

saveOriginalDisplay(sesionForm, 'flex');
saveOriginalDisplay(sesionActiva, 'flex');
saveOriginalDisplay(seccionTareas, 'block');
saveOriginalDisplay(tituloBienvenido, 'block');

// === FUNCIONES DE SESIÓN ===
function iniciarSesion() {
  const nombre = inputUsuario.value.trim();
  if (nombre === "") {
    alert("Por favor, ingresa un nombre para continuar.");
    return;
  }

  sessionStorage.setItem("usuario", nombre);
  mostrarApp();
}

function cerrarSesion() {
  sessionStorage.removeItem("usuario");
  ocultarApp();
}

function verificarSesion() {
  const usuario = sessionStorage.getItem("usuario");
  if (usuario) {
    mostrarApp();
  } else {
    ocultarApp();
  }
}

function mostrarApp() {
  const usuario = sessionStorage.getItem("usuario");
  saludoUsuario.textContent = `Hola, ${usuario}!`;

  // Animaciones: ocultar formulario y título; mostrar sesión activa y tareas
  animateHide(sesionForm);
  animateShow(sesionActiva);
  animateShow(seccionTareas);
  animateHide(tituloBienvenido);

  mostrarTareas();
}

function ocultarApp() {
  // Revertir animaciones
  animateShow(sesionForm);
  animateHide(sesionActiva);
  animateHide(seccionTareas);
  animateShow(tituloBienvenido);
  inputUsuario.value = "";
}

// Animaciones genéricas: usan las clases .fade y .show definidas en CSS
function animateShow(el) {
  if (!el) return;
  // restaurar display antes de animar
  const orig = el.dataset && el.dataset.originalDisplay ? el.dataset.originalDisplay : '';
  el.style.display = orig || '';
  // asegurar que tenga la clase base
  el.classList.add('fade');
  // forzar reflow para que la transición se aplique
  void el.offsetWidth;
  el.classList.add('show');
}

function animateHide(el) {
  if (!el) return;
  el.classList.add('fade');
  el.classList.remove('show');
  // después de la duración de la transición, ocultamos del flow
  setTimeout(() => {
    // sólo ocultar si sigue sin la clase show
    if (!el.classList.contains('show')) {
      el.style.display = 'none';
    }
  }, 500);
}

// === FUNCIONES CRUD DE TAREAS ===

// Variables para la nueva tarea
let nuevaTareaTexto = "";
let nuevaTareatipo = "";

// CREATE
function agregarTarea() {
  try {
    nuevaTareaTexto = inputTarea.value.trim();
    if (nuevaTareaTexto === "") {
      alert("Por favor, escribe una tarea antes de agregarla.");
      return;
    }

    if (nuevaTareaTexto.length > 100) {
      alert("La tarea no puede tener más de 100 caracteres.");
      return;
    }

    const usuario = sessionStorage.getItem("usuario");
    const tareas = obtenerTareasUsuario(usuario);

    // Validar número máximo de tareas
    if (tareas.length >= 50) {
      alert("Has alcanzado el límite máximo de 50 tareas.");
      return;
    }

    // Mostrar modal de clasificación
    mostrarModal();
  } catch (error) {
    handleStorageError(error);
  }
}

// Funciones del modal
function mostrarModal() {
  modal.style.display = "flex";
  modal.querySelector('.modal-content').classList.add('show');
}

function ocultarModal() {
  modal.querySelector('.modal-content').classList.remove('show');
  setTimeout(() => {
    modal.style.display = "none";
  }, 300);
}

// Event listeners para el modal
tiposBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    nuevaTareatipo = btn.dataset.tipo;
    guardarNuevaTarea();
    ocultarModal();
  });
});

// Cerrar modal si se hace clic fuera
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    ocultarModal();
  }
});

function guardarNuevaTarea() {
  const usuario = sessionStorage.getItem("usuario");
  const tareas = obtenerTareasUsuario(usuario);
  
  // Guardar tarea con su tipo
  tareas.push({
    texto: nuevaTareaTexto,
    tipo: nuevaTareatipo
  });
  
  localStorage.setItem(`tareas_${usuario}`, JSON.stringify(tareas));
  inputTarea.value = "";
  mostrarTareas();
  inputTarea.focus();
}

// READ
function mostrarTareas() {
  try {
    const usuario = sessionStorage.getItem("usuario");
    const tareas = obtenerTareasUsuario(usuario);

    listaTareas.innerHTML = "";

    tareas.forEach((t, i) => {
      const li = document.createElement("li");
      li.className = 'fade';
      // Si la tarea es del formato antiguo (string), mostrarla sin icono
      const tarea = typeof t === 'string' ? { texto: t, tipo: 'otros' } : t;
      const icono = ICONOS_TAREA[tarea.tipo] || ICONOS_TAREA.otros;
      
      // Añadir data-tipo para los estilos
      li.setAttribute('data-tipo', tarea.tipo);
      
      li.innerHTML = `
        <span><span class="tarea-icon">${icono}</span>${tarea.texto}</span>
        <div class="task-buttons">
          <button class="edit-btn" data-index="${i}">Edit</button>
          <button class="delete-btn" data-index="${i}">Delete</button>
        </div>
      `;
      
      // Agregar event listeners
      const editBtn = li.querySelector('.edit-btn');
      const deleteBtn = li.querySelector('.delete-btn');
      
      editBtn.addEventListener('click', () => editarTarea(i));
      deleteBtn.addEventListener('click', () => eliminarTarea(i));
      
      listaTareas.appendChild(li);
      // Trigger animation
      setTimeout(() => li.classList.add('show'), 50 * i);
    });
  } catch (error) {
    handleStorageError(error);
  }
}

// UPDATE
function editarTarea(index) {
  try {
    const usuario = sessionStorage.getItem("usuario");
    const tareas = obtenerTareasUsuario(usuario);
    const tarea = tareas[index];
    // Si la tarea es del formato antiguo, convertirla
    const tareaActual = typeof tarea === 'string' ? { texto: tarea, tipo: 'otros' } : tarea;

    const nueva = prompt("Editar tarea:", tareaActual.texto);
    if (nueva !== null) {
      const nuevaTrim = nueva.trim();
      if (nuevaTrim === "") {
        alert("La tarea no puede estar vacía.");
        return;
      }
      
      // Mantener el tipo de tarea al editar
      tareas[index] = {
        texto: nuevaTrim,
        tipo: tareaActual.tipo
      };
      localStorage.setItem(`tareas_${usuario}`, JSON.stringify(tareas));
      mostrarTareas();
    }
  } catch (error) {
    handleStorageError(error);
  }
}

// DELETE
function eliminarTarea(index) {
  try {
    if (!confirm("¿Estás seguro de que deseas eliminar esta tarea?")) {
      return;
    }

    const usuario = sessionStorage.getItem("usuario");
    const tareas = obtenerTareasUsuario(usuario);

    // Animar eliminación
    const li = listaTareas.children[index];
    li.classList.remove('show');
    
    setTimeout(() => {
      tareas.splice(index, 1);
      localStorage.setItem(`tareas_${usuario}`, JSON.stringify(tareas));
      mostrarTareas();
    }, 300);
  } catch (error) {
    handleStorageError(error);
  }
}

// OBTENER TAREAS POR USUARIO
function obtenerTareasUsuario(usuario) {
  return JSON.parse(localStorage.getItem(`tareas_${usuario}`)) || [];
}
