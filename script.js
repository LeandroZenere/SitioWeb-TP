//#region Boton para Seguir y dejar de Seguir

const btnSeguir = document.getElementById('seguir');
// Variable para saber si lo sigue o no.
let siguiendo = true;

// Función actualizar el texto del botón
function estadoSeguido() {
    // Invertimos el valor de la variable siguiendo. Si siguiendo es true, se asignará false, 
    // y si siguiendo es false, se asignará true. Esto funcionará así por cada click que demos
  siguiendo = !siguiendo;
  actualizarSeguir();
}

// Función para actualizar el texto del botón según el estado actual
function actualizarSeguir() {
  if (siguiendo) {
    btnSeguir.innerText  = 'Seguir';
  } else {
    btnSeguir.innerText  = 'Dejar de seguir';
  }
}

// Llamamos a la función estadoSeguido()
btnSeguir.addEventListener('click', estadoSeguido);

// Mostramos los cambios
actualizarSeguir();
//#endregion 

//#region Botón Like
const btnMeGusta = document.getElementById('MeGusta');
const contador = document.getElementById('cantidadLikes');
let i = 200;
let mg = true;
btnMeGusta.addEventListener('click', function() {
  if (!mg) {
    i--;
  } 
  else {
    i++;
  }
  contador.innerText = i + " Likes"; //Mostramos texto
  contador.style.fontWeight = mg ? 'bold' : 'bold'; //Ponemos texto en negrita para cuando se da y se saca el MG.
  mg = !mg;
  
});
//#endregion

//#region Comentarios
const btnEnviar = document.getElementById('btnEnviar');
const comentarioEnviado = document.getElementById('comentarioEnviado');

btnEnviar.addEventListener('click', function(a) {
  a.preventDefault();
//Quitamos espacios de más, tanto del nombre como del comentario.
  const nombre = document.getElementById('usuarioIngresado').value.trim();
  const comentario = comentarioEnviado.value.trim();

  if (nombre === '' || comentario === '') {
    chequeoValores('Error', 'Recuerda ingresar un nombre de usuario y un comentario', 'error');
  } else {
    chequeoValores('Comentario enviado', `Usuario: ${nombre}`, 'success')
      .then(() => {
        //Después de asegurarnos que se ingresaron valores, agregamos el comentario con el método creado.
        agregarComentario(nombre, comentario);

        //Reasignamos el valor del comentario a vacío para poder utilizarlo de nuevo.
        comentarioEnviado.value = '';
      });
  }
});

function chequeoValores(titulo, mensaje, icono) {
    //Utilizamos una notificación/alerta con la librería de Sweet Alert.
  return Swal.fire({
    icon: icono,
    title: titulo,
    text: mensaje,
    showCancelButton: false,
    showConfirmButton: true,
    confirmButtonText: 'Aceptar',
    allowOutsideClick: false, //No permitimos al usuario interactuar fuera de la alerta.
  });
}

function agregarComentario(nombre, comentario) {
  const comentariosContainer = document.querySelector('.comentarios'); //Seleccionamos el DIV contenedor.
  const nuevoComentario = document.createElement('p'); //Creamos un <p>.
  const strongNombre = document.createElement('strong'); //Creamos un <strong>.
  const botonEliminar = document.createElement('button'); //creamos botón por cada comentario que creemos.
  const textoEliminar = document.createTextNode('Eliminar'); // Texto "Eliminar" para el botón
  const textoNombre = document.createTextNode(`${nombre}: `); //seteamos el valor del nombre obtenido dentro de "textoNombre"
  const textoComentario = document.createTextNode(comentario); //seteamos el valor del comentario obtenido dentro de "textComentario"
  
  
  botonEliminar.className = "eliminar-btn"; // Damos valor de clase "eliminar-btn" al botón para después usarlo.
  botonEliminar.appendChild(textoEliminar); // Agregamos el texto "Eliminar" al botón
  strongNombre.className = 'nombre2'; //Damos valor de clase 'nombre2' al strong, para después usarlo.
  strongNombre.appendChild(textoNombre); //Añadimos el texto que contiene el valor del nombre recibido.

  nuevoComentario.appendChild(botonEliminar); //anexamos el botón creado para eliminar el comentario
  nuevoComentario.appendChild(strongNombre); //Dentro del <p> creado arriba, anexamos el <strong class="nombre2">, valor asignado en strongNombre.className = 'nombre2';
  nuevoComentario.appendChild(textoComentario);

  comentariosContainer.appendChild(nuevoComentario); //metemos el nuevo <p> con los valores al div.
}

//#endregion 

//#region Botón Eliminar Comentario
// Seleccionamos el div de los comentarios
const comentariosContainer = document.querySelector('.comentarios');

comentariosContainer.addEventListener('click', function(event) {
  // Vemos si el elemento que clickeamos tiene la clase "eliminar-btn"
  if (event.target.classList.contains('eliminar-btn')) {
    //Usamos parentNode para acceder al 'Padre' del botón eliminar, en este caso sería <p> ya que el botón creado
    //en la región comentarios lo añadimos ahí.
    //Al apretar sobre el botón eliminar, le asignamos <p> a la variable comentario que creamos.

    const comentario = event.target.parentNode;
    comentario.remove(); //Borramos el comentario.
  }
});
//#endregion