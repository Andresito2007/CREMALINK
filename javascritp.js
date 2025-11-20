//VIMOS EN JAVA SCRITP , VARIABLES , CONDICIONALES , BUCLES,DOOM Y INVESTIGUE POR MI CUENTA EL POO (PROGRAMACION ORIENTADA A OBJETOS Y EL LOCALSTORAGE) , JSON Y OTROS
class Entrada {
  // LE PONEMOS UN METODO CONSTRUCTOR , ESTE ES UN METODO QUE SE EJECUTA AL TOQUE CUANDO CREAMOS NUESTROS OBJETOS
  constructor(tipo, precio, cantidad) { // NUESTROS PARAMETROS
    //usamos this para crear nuestros obejto , el this es similar al self en poo python que vemos
    //ATRIBUTOS
    this.tipo = tipo;           //  "normal", "premium", "vip"
    this.precio = precio;      //   45,85,150
    this.cantidad = cantidad;   //de 1 al 10 (vamos a restringir nuestra cantidad por partido )
  }
  // METODOS (LAS ACCIONES QUE PUEDE HACER NUESTRO OBEJTO ):
  calcularTotal() {
    return this.precio * this.cantidad; //ESTA FUNCION RETORNA EL TOTAL A PAGAR OSEA LO QUE TIENE QUE PAGAR EL USUARIO
  }
}
// CREAMOS UNA CLASE RESERVA QUE HEREDARA A LA CLASE ENTRADA (HERENCIA)
class Reserva extends Entrada { 
  constructor(partido, fecha, tipo, precio, cantidad) {
    // "super" llama al constructor de la clase padre (Entrada)
    super(tipo, precio, cantidad);
    this.partido = partido;     // ejemplo: "Barcelona vs Elche"
    this.fecha = fecha;         // ejemplo: "02/11/2025"
    this.id = Date.now();       // id unico , el date.now para registrar nuestro id
  }
}
let todasLasReservas = []; // Array >(lista) vacia que guardara las reservas totales
//para el modal (nuestra ventana que aparecera)
let partidoActual = "";   // para guardar el partido que va reservar el partido que reservo el usuario
let fechaActual = "";     // para guardar la fecha del partido
// esta funcion se ejecutara cuando ingresemos a la pagina
function empezar() {
  // Buscar TODOS los botones de "Reservar"
  let botones = document.querySelectorAll(".btn-reservar"); // el queryselectorall (el all=todos)  busca en nuestro documento todos los elementos con la clase btn-reservar
  //el document es nuestra pagina html
  // usamos un bucle for para recorrer cada boton tenemos 5 botones solo lo hara el evento para esos 5 botones que tienen esa clase
  for (let i = 0; i < botones.length; i++) {
  //   creamos nuestra variable i , la condicion es mientras i sea menor que la cantidad de botones , va a incrementar en uno por uno
    botones[i].onclick = function() { // Agregamoa el evento onclick para hacer click a cada boton 
      abrirModal(this); // si hace click en botones que tiene al boton reservar en html se va a abrir nuestro modal osea nuestra ventana para seleccionar nuestras reservas el tipo cantida ,etc
      //this = va representar el boton que el usuario presiono.
    };
  }
  // Evento para cuando cambien el tipo de entrada (normal, premium, vip)
  let radios = document.querySelectorAll('input[name="tipoEntrada"]');
  for (let i = 0; i < radios.length; i++) {
    radios[i].onchange = function() { //cuando escribimos el precio el onchange se activa y llama a ka funcion
      calcularPrecio();
    };
  }
  // Evento para cuando cambien la cantidad
  let inputCantidad = document.getElementById("cantidad");
  if (inputCantidad) {
    inputCantidad.oninput = function() { //cuando cambiamos de tipo de entrada presioname click el oninput llama a la funcion
      calcularPrecio();
    };
  }
  // Evento para el boton de "Confirmar Reserva"
  let btnConfirmar = document.getElementById("btnConfirmar"); //busca por id el boton confrima reserva
  if (btnConfirmar) { // condicionales , si el btnconfirma existe entonces
    btnConfirmar.onclick = function() { //cuando el usuario haga clck en el onclick llama a la funcion
      guardarReserva();
    };
  }
  // Evento para cancelar todas las reservas
  let btnCancelarTodas = document.querySelector(".btn-cancelar-todas"); //busca por id el boton cancelar todas las reservas
  if (btnCancelarTodas) { // condicionales , si existe entonces
    btnCancelarTodas.onclick = function() { // cuando el usuario haga clck en el onclick llama a la funcion
      borrarTodas();
    };
  }
  // si el usuario va a parte de misreservas, las muestra
  cargarReservasGuardadas(); //recuper las reservas del localstorsge
  mostrarReservas(); //muestra las reservas que guardamos
}
// creamos la funcion para abrir el MODAL
function abrirModal(boton) {
  // BUSCA EL ELEMENTO PADRE DEL BOTON , SERIA LA TARJETA DE LOS PARTIDOS
  let tarjeta = boton.parentElement;
  //  Y BUSCA LOS NOMBRES DE LOS EQUIPOS POR CLASE
  let equipos = tarjeta.querySelectorAll(".nombre-de-equipo");
  let equipo1 = equipos[0].textContent; // LOS PONE POR INDICE
  let equipo2 = equipos[1].textContent;
  // Buscar la fecha
  let fecha = tarjeta.querySelector(".fecha").textContent; // solo hay una fecha por eso sin el all
  // guardamos las variables 
  partidoActual = equipo1 + " vs " + equipo2; //concatenamos
  fechaActual = fecha;
  // cambiamos el texto del modal
  document.getElementById("modalTitle").textContent = partidoActual; //el textcontent obtiene el texto visible de nuestro elemento html
  document.getElementById("modalFecha").textContent = fecha;
  // Reiniciamos los valores
  document.getElementById("normal").checked = true; // por defecto cuando abras el modal se va a poner el tipo nrmal de entrada osea el mas comun
  document.getElementById("cantidad").value = 1; // ya estara por defecto la cantidad minima de 1 
  calcularPrecio();
  // PARA ABRIR EL MODAL (VISUALMENTE EN NUESTRA PAGINA )
  let modal = new bootstrap.Modal(document.getElementById("modalReserva")); //Creamos un nuevo modal de Bootstrap con  id='modalReserva'.” , el new tamos indicando una nueva instancia como en python seria asignarle la clase a un obejtpp
  modal.show(); //PARA QUE  NUESTRO MODAL APARESCA EN LA PANTALLA , show en español es mostrar datito
}
function calcularPrecio() {
  // Buscar qué tipo de entrada está seleccionado
  let tipoSeleccionado = document.querySelector('input[name="tipoEntrada"]:checked');
  let tipo = tipoSeleccionado.value; //lo obtiene si es normal , vip o premiun
  // Variable para guardar el precio
  let precio = 0;
  // CONDICIONAL IF: según el tipo, asignar el precio
  if (tipo === "normal") {
    precio = 45;
  } else if (tipo === "premium") {
    precio = 85;
  } else if (tipo === "vip") {
    precio = 150;
  }
  // Obtener la cantidad
  let cantidad = document.getElementById("cantidad").value;
  cantidad = parseInt(cantidad);  // Convertir texto a número
  // validar: la cantidad debe estar entre 1 y 10
  if (cantidad < 1) { //si la cantidad es menor a uno igual se pondra 1 por defecto
    document.getElementById("cantidad").value = 1;
  }
  if (cantidad > 10) {  //si la cantidad es mayor a 10 igual se pondra 10 por defecto
    cantidad = 10;
    document.getElementById("cantidad").value = 10;
  }
  // calculamos el total
  let total = precio * cantidad;
  // mostramos en la pagina
  document.getElementById("totalPrecio").textContent = total+"€"; // en euros porque es lo que el barca es equipo español
}
//funcion para guardar la reserva para guardar la reserva
function guardarReserva() {
  // obetenemos los datos del modal
  let tipo = document.querySelector('input[name="tipoEntrada"]:checked').value;
  let cantidad = parseInt(document.getElementById("cantidad").value); //lo convierto a numero
  // determinamos el precio según el tipo
  let precio = 0;
  if (tipo === "normal") { // si el tipo es normal entonces precio vale 45
    precio = 45;
  } else if (tipo === "premium") { // si el tipo es premiun entonces precio vale 85
    precio = 85;
  } else if (tipo === "vip") { // si el tipo es normal entonces precio vale 150
    precio = 150;
  }
  // creamos un nuevo objeto de la clase reserva 
  let nuevaReserva = new Reserva(partidoActual, fechaActual, tipo, precio, cantidad); //  el new es la instancia de la clase y que ejecuta nuestr constructor
  // agregamos al array de reservas
  todasLasReservas.push(nuevaReserva); // el .push agrega elementos al final de un array
  // GUARDAR en localStorage (es como una minibasededatos dentro del html) (para que no se pierda)
  localStorage.setItem("reservas", JSON.stringify(todasLasReservas)); //lo guardo en el localsotage , .setItem guarda los datos inlcuso si cerramos la psgina, el  JSON.stringify covierte el array a texto ya que el local solo acepts strigns
  // mostramos el mensaje con alert
  alert("¡Reserva confirmada!\n" + partidoActual + "\n" + fechaActual + "\nTipo: " + tipo + "\nCantidad: "+ cantidad + "\nTotal: €" + nuevaReserva.calcularTotal()); //lamo a calculartotal para obtener el monto
  // Cerramos el modal , /n salto de liena 
  let modal = bootstrap.Modal.getInstance(document.getElementById("modalReserva")); // el .getInstance obtiene los datos del modal creado. 
  modal.hide(); //cierra nuestro modal
}
//funcion para cargar reservas guardadas
function cargarReservasGuardadas() {
  // buscamos si hay reservas guardadas en localStorage
  let guardadas = localStorage.getItem("reservas");
  // CONDICIONAL: si hay algo guardado
  if (guardadas) {
    let datos = JSON.parse(guardadas);  // Convertir el texto a array de nuevo
  // BUCLE FOR: recorrer cada dato y crear las reservas
    for (let i = 0; i < datos.length; i++) { //recorro
      let d = datos[i];
      let reserva = new Reserva(d.partido, d.fecha, d.tipo, d.precio, d.cantidad); //creamos una nueva instancia
      reserva.id = d.id;  // Mantengo el ID original para identificarla si quiero elminarla
      todasLasReservas.push(reserva);
    }
  }
}
// funcion para mostrar las reservas en la tabla
function mostrarReservas() {
  // Buscar el tbody de la tabla
  let tbody = document.querySelector(".tabla-reservas tbody"); // busca la etiqueta tbody por la clase tabla.reservas
  // VALIDACIÓN: si no existe, salir de la función
  if (!tbody) { // el ! es como el not de python , entonces seria si no existe el tbody retornas osea salimos de la funcion
    return;
  }
  tbody.innerHTML = '';  // borro el contenido del tbody osea lo limpio antes de llenarla.
  if (todasLasReservas.length === 0) { // si la longitud de todas..reservs es ===0 eontces
    tbody.innerHTML = '<tr><td colspan="6" style="text-align: center;">NO TIENES RESERVAS </td></tr>'; //colspan="6" hace que nuestra celda ocupe las 6 columnas de la tabla. , le ponemos el estilo text-alink para centrar nuestro texto
    actualizarResumen(); //llamamos a nuestra funcion
    return; //detiene nuestra funcion
  }
  // usamos un bucle for para crear una fila por cada reserva
  for (let i = 0; i < todasLasReservas.length; i++) {
      //definimos la variable i=0 , mientras i sea menor que la longitud de todaslareservas,length , incrementa
    let reserva = todasLasReservas[i];
    // condicional para determinar la clase de css segun el tipo de entrada que elijamos
    let clase = ''; //creo mi variable clase que estara vacia 
    if (reserva.tipo === "normal") { // el .tipo es nuestra propiedad del obejteto de nuestra clase rserva
      //si reservas es igual a normal
      clase = "badge-normal"; //llamamos por estilos que estan definidos en nuestro css
    } else if (reserva.tipo === "premium") {
      clase = "badge-premium"; // osea cada condicional tiene su color para asignarle a la variable clase
    } else if (reserva.tipo === "vip") {
      clase ="badge-vip";
    } 
    // creamos nuestra fila con createelement
    let fila = document.createElement('tr'); //creamos una fila vacia con tr (tabla) para meter los datps de nuestra reservas
    // el innerHTML es una propiedad que nos permite cambiar todo el contenido HTML que esta dentro de un elemento y lo usaremos pa crear nuestra fila, crear nuestras etiquetas manualmente dentro de fila, innetrhml puede crear etiquetas , borrar las que hay y agregar sin borrarlas
    //la etiqueta td se usa para crear celdas dentro de una fila de una tabla.
    fila.innerHTML = ` 
      <td>${reserva.partido}</td>
      <td>${reserva.fecha}</td>
      <td><span class="badge ${clase}">${reserva.tipo.toUpperCase()}</span></td> 
      <td>${reserva.cantidad}</td>
      <td><strong>€${reserva.calcularTotal()}</strong></td>
      <td>
        <button class="btn-cancelar" onclick="borrarReserva(${reserva.id})">
          CANCELAR ENTRADA
        </button>
      </td>
    `; //esas comillas ` les dicen "template literals", por lo que entendi sirven para poder escribir  (multilineas) osea escribir varias lineas y insertar nuestras variables con el signo de dolra ${}
    //innerHTML funciona como si estuvieramos en un index-htl pero version mini dentro de nuestro javascritp. creamos nuestros , botones con su ckase y su evento
    // creamos la tabla con tr y le ponemos celdas con td , con el signo de dolar para poner variables y ponemos algunos texto con negrita con strong , la clase="badge clase se reemplazara por badgenormal o otro depende la condicional",  el ${reserva.calcularTotal()} ejecuta nuestro metodo calcularTotal() del objeto lamado reserva
      tbody.appendChild(fila); // el appenchild (agrega un elemnto dentro de otr) para agregarle la fila a nuestro tbody el boton de clase btn-cancelar es el que le saldra al usuario cuando confirme una reserva y cuando vaya a misrservas le saldra en la celda de cancelacion el boton para cancelarla
  } //el toUppercase para convertirlo en mayusucla por ejemplo de vip a VIP se nota mas, y el onclick cuando el usuario haga clic se ejecita la funcion borrarRserva por id unico
  actualizarResumen(); // actualizamos nuestro resumen
}
// funcion para actualizar el resumen
function actualizarResumen() {
  // contamos cuantas reservas hay
  let numerodeReservas = todasLasReservas.length;
  // Contar el TOTAL de entradas
  let totalEntradas = 0;
  for (let i = 0; i < todasLasReservas.length; i++) {
    totalEntradas = totalEntradas + todasLasReservas[i].cantidad;
  }
  // Calcular el TOTAL a pagar
  let totalPagar = 0;
  for (let i = 0; i < todasLasReservas.length; i++) { //nuestra propiedad lenght devuelve el numero de elemento de un array
    //defino mis variable en 0 recorriendo todas las reservas sumando su total a pagar
    totalPagar = totalPagar + todasLasReservas[i].calcularTotal(); //llamo al metodo calculartotal de cada reserva para que me retorne su su total
  }
  // lo mostramos en nuestra pagina
  let elementodeReservas = document.getElementById("totalReservas"); //busco mis elementos para mostrar los totales 
  let elementodeEntradas = document.getElementById("totalEntradas");
  let elementodePagar = document.getElementById("totalPagar"); //por id
  if (elementodeReservas) // si cada elemento con su condicional existe entonces actualizo el texto con su total
     elementodeReservas.textContent = numerodeReservas;
  if (elementodeEntradas) 
    elementodeEntradas.textContent = totalEntradas;
  if (elementodePagar) 
    elementodePagar.textContent =  totalPagar + "€"  ;
}
// creamos una funcion para borrar reservas indviduales o especificas
function borrarReserva(id) { // cada botoncito "Cancelar" llama esta funcion pasandole el id unico.
  // preguntamos al usuario si esta seguro de eliminarla
  let confirma = confirm("¿Estas seguro que quieres cancelar esta reserva?"); //el confirm es una funcion del navegador que muestra una ventana con dos botones acpetar y cancelar
  // CONDICIONAL: si el usuario lo confirma
  if (confirma) { // es true o verdadero
    // usamos un bucle for para encontrar la reserva
    for (let i = 0; i < todasLasReservas.length; i++) {
      if (todasLasReservas[i].id === id) { //recoorro el array buscando la reserva con el id que coincide con el recibido
        // lo borramos del array
        todasLasReservas.splice(i, 1); //elimino 1 elemento del array en la posicion i y salgo del bucle con break ,splice(i, 1) borra el elemento en el indice
        break;  // para terminar el bucle
      }
    }
    // lo guardamos en el localStorage , JSON.stringify es convierte un array en texto para poder guardarlo en nuestro localStorage.
    localStorage.setItem("reservas", JSON.stringify(todasLasReservas)); //localStorage solo acepta texto.
    // actualizamos nuestra tabla
    alert("Reserva cancelada");//mostramos al usuario
    mostrarReservas() //llamos al mostrareservas para que se actualize las reservas si hay o no
  }
}
// funcion para borrar todas las reservas
function borrarTodas() {
  // VALIDACIÓN: si no hay reservas
  if (todasLasReservas.length === 0) {
    alert("No hay reservas para cancelar"); //ponemos un alert para indicarle al usuario
    return; //salimos de la funcion
  }
  // Preguntamos al usuario
  let confirma = confirm("¿Seguro que quieres cancelar todas tus reservas?");
  // CONDICIONAL: solo si el usuario lo confirma
  if (confirma) {
    // Vaciamos el array
    todasLasReservas = [];
    // lo borramos del localStorage
    localStorage.setItem("reservas", JSON.stringify(todasLasReservas));
    // actualizamos nuestra tabla
    mostrarReservas();
    alert("Todas tus reservas fueron canceladas"); //mostramos al usuario
  }
}
window.onload = function() { // window es toda la ventana de nuestro navegador y onload es un evento que se activa cuando nuestra pagina cargue completamente”.
  empezar(); // cuandp cargue se ejcuta la funcion empezar la que hicimos antes
};