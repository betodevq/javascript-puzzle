// Arreglo que contiene las intrucciones del juego 
var instrucciones = ['El puzzle debe quedar como la imagen de referencia.', 'No hay tiempo limite.', 'Regla extra porque no se me ocurre otra mas'];
// Arreglo para ir guardando los movimientos que se vayan realizando
var movimientos = [];

// Representación de la grilla. Cada número representa a una pieza.
// El 9 es la posición vacía
var grilla = [
	[1, 2, 3],
	[4, 5, 6],
	[7, 8, 9]
];



/* Estas dos variables son para guardar la posición de la pieza vacía. 
Esta posición comienza siendo la [2, 2]*/
var filaVacia = 2;
var columnaVacia = 2;

/* Esta función deberá recorrer el arreglo de instrucciones pasado por parámetro. 
Cada elemento de este arreglo deberá ser mostrado en la lista con id 'lista-instrucciones'. 
Para eso deberás usar la función ya implementada mostrarInstruccionEnLista().
Podés ver su implementación en la ultima parte de este codigo. */
function mostrarInstrucciones(instrucciones) {

	for (i = 0; i < instrucciones.length; i++) {
		mostrarInstruccionEnLista(instrucciones[i], 'lista-instrucciones');
		console.log(instrucciones[i]);
	}
}

/* COMPLETAR: Crear función que agregue la última dirección al arreglo de movimientos
y utilice actualizarUltimoMovimiento para mostrarlo en pantalla */
function trackerMovimientos(codigoMovimiento) {

	switch (codigoMovimiento) {
		case (codigosDireccion.ARRIBA):
			movimientos.push('abajo');
			actualizarUltimoMovimiento(codigosDireccion.ABAJO);
			break;
		case (codigosDireccion.DERECHA):
			movimientos.push('izquierda');
			actualizarUltimoMovimiento(codigosDireccion.izquierda);
			break;
		case (codigosDireccion.ABAJO):
			movimientos.push('arriba');
			actualizarUltimoMovimiento(codigosDireccion.ARRIBA);
			break;
		case (codigosDireccion.IZQUIERDA):
			movimientos.push('derecha');
			actualizarUltimoMovimiento(codigosDireccion.DERECHA);
			break;
	}
}
/* Esta función va a chequear si el Rompecabezas esta en la posicion ganadora. 
Existen diferentes formas de hacer este chequeo a partir de la grilla. */
function chequearSiGano() {
	var grillaGanadora = [
		[1, 2, 3],
		[4, 5, 6],
		[7, 8, 9]
	];

	for (var i = 0; i < grilla.length; i++) {
		for (var j = 0; j < grilla[i].length; j++) {
			if (grilla[i][j] != grillaGanadora[i][j]) {
				return false;
			}
		}
	}
	return true;
}

function pantallaFinal(){
	swal({
		title: 'Ganaste!',
		icon: 'success',
		text: 'Completaste el rompecabezas correctamente!',
		buttons:{
			regresar: {
				text: 'Volver al inicio',
				value: 'regresar',
			},
			reiniciar: {
				text: 'Volver a jugar',
				value: 'reiniciar',
			},
		}
	})
	.then((value) => {
		switch(value){
			case 'regresar':
				window.location.href = 'index.html';
			break;
			case 'reiniciar':
				window.location.reload();
			break;
		}
	});
}

// Implementar alguna forma de mostrar un cartel que avise que ganaste el juego
function mostrarCartelGanador() {

	if (chequearSiGano()) {
		playSound("win-sound");
		pantallaFinal();
	};
}

function playSound(sound) {
	const audio = document.querySelector(`audio[id="${sound}"]`);
	audio.play();
};

/* Función que intercambia dos posiciones en la grilla.
Pensar como intercambiar dos posiciones en un arreglo de arreglos. 
Para que tengas en cuenta:
Si queremos intercambiar las posiciones [1,2] con la [0, 0], si hacemos: 
arreglo[1][2] = arreglo[0][0];
arreglo[0][0] = arreglo[1][2];

En vez de intercambiar esos valores vamos a terminar teniendo en ambas posiciones el mismo valor.
Se te ocurre cómo solucionar esto con una variable temporal?
*/
function intercambiarPosicionesGrilla(filaPos1, columnaPos1, filaPos2, columnaPos2) {
	var aux = grilla[filaPos2][columnaPos2];
	grilla[filaPos2][columnaPos2] = grilla[filaPos1][columnaPos1];
	grilla[filaPos1][columnaPos1] = aux;
}

// Actualiza la posición de la pieza vacía
function actualizarPosicionVacia(nuevaFila, nuevaColumna) {
	filaVacia = nuevaFila;
	columnaVacia = nuevaColumna;
}


// Para chequear si la posicón está dentro de la grilla.
function posicionValida(fila, columna) {
	var tamanoGrilla = grilla.length - 1;
	if (fila > tamanoGrilla || columna > tamanoGrilla || fila < 0 || columna < 0) {
		return false;
	}
	return true;
}

/* Movimiento de fichas, en este caso la que se mueve es la blanca intercambiando su posición con otro elemento.
Las direcciones están dadas por números que representa: arriba (38), abajo (40), izquierda (37), derecha (39) */
function moverEnDireccion(direccion) {
	var nuevaFilaPiezaVacia;
	var nuevaColumnaPiezaVacia;

	// Mueve pieza hacia abajo, reemplazandola con la blanca
	if (direccion === codigosDireccion.ABAJO) {
		nuevaFilaPiezaVacia = filaVacia - 1;
		nuevaColumnaPiezaVacia = columnaVacia;
	}

	// Mueve pieza hacia arriba, reemplazandola con la blanca
	else if (direccion === codigosDireccion.ARRIBA) {
		nuevaFilaPiezaVacia = filaVacia + 1;
		nuevaColumnaPiezaVacia = columnaVacia;
	}

	// Mueve pieza hacia la derecha, reemplazandola con la blanca
	else if (direccion === codigosDireccion.DERECHA) {
		nuevaColumnaPiezaVacia = columnaVacia - 1;
		nuevaFilaPiezaVacia = filaVacia;
	}

	// Mueve pieza hacia la izquierda, reemplazandola con la blanca
	else if (direccion === codigosDireccion.IZQUIERDA) {
		nuevaColumnaPiezaVacia = columnaVacia + 1;
		nuevaFilaPiezaVacia = filaVacia;
	}

	/* A continuación se chequea si la nueva posición es válida, si lo es, se intercambia. 
	Para que esta parte del código funcione correctamente deberás haber implementado 
	las funciones posicionValida, intercambiarPosicionesGrilla y actualizarPosicionVacia */

	if (posicionValida(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia)) {
		intercambiarPosiciones(filaVacia, columnaVacia, nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
		actualizarPosicionVacia(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
		//COMPLETAR: Agregar la dirección del movimiento al arreglo de movimientos
		trackerMovimientos(direccion);
	}
}

function playKeySound(e) { //Reproduce sonido cada vez que mueve una tecla
	const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
	const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
	if (!audio) return; //Detiene la función en caso de no ser una tecla con sonido
	audio.currentTime = 0; //Reinicia el sonido permitiendo la repeticion continua de este mismo
	audio.play();
}

window.addEventListener('keydown', playKeySound); //reproduce el sonido al presionar las flechas

//////////////////////////////////////////////////////////
////////A CONTINUACIÓN FUNCIONES YA IMPLEMENTADAS.////////
/////////NO TOCAR A MENOS QUE SEPAS LO QUE HACES//////////
//////////////////////////////////////////////////////////

/* Las funciones y variables que se encuentran a continuación ya están implementadas.
No hace falta que entiendas exactamente que es lo que hacen, ya que contienen
temas aún no vistos. De todas formas, cada una de ellas tiene un comentario
para que sepas que se está haciendo a grandes rasgos. NO LAS MODIFIQUES a menos que
entiendas perfectamente lo que estás haciendo! */

/* codigosDireccion es un objeto que te permite reemplazar
el uso de números confusos en tu código. Para referirte a la dir
izquierda, en vez de usar el número 37, ahora podés usar:
codigosDireccion.IZQUIERDA. Esto facilita mucho la lectura del código. */
var codigosDireccion = {
	IZQUIERDA: 37,
	ARRIBA: 38,
	DERECHA: 39,
	ABAJO: 40
}

/* Funcion que realiza el intercambio logico (en la grilla) y ademas actualiza
el intercambio en la pantalla (DOM). Para que funcione debera estar implementada
la funcion intercambiarPosicionesGrilla() */
function intercambiarPosiciones(fila1, columna1, fila2, columna2) {
	// Intercambio posiciones en la grilla
	var pieza1 = grilla[fila1][columna1];
	var pieza2 = grilla[fila2][columna2];

	intercambiarPosicionesGrilla(fila1, columna1, fila2, columna2);
	intercambiarPosicionesDOM('pieza' + pieza1, 'pieza' + pieza2);

}

/* Intercambio de posiciones de los elementos del DOM que representan
las fichas en la pantalla */

function intercambiarPosicionesDOM(idPieza1, idPieza2) {
	// Intercambio posiciones en el DOM
	var elementoPieza1 = document.getElementById(idPieza1);
	var elementoPieza2 = document.getElementById(idPieza2);

	var padre = elementoPieza1.parentNode;

	var clonElemento1 = elementoPieza1.cloneNode(true);
	var clonElemento2 = elementoPieza2.cloneNode(true);

	padre.replaceChild(clonElemento1, elementoPieza2);
	padre.replaceChild(clonElemento2, elementoPieza1);
}

/* Actualiza la representación visual del último movimiento 
en la pantalla, representado con una flecha. */
function actualizarUltimoMovimiento(direccion) {
	ultimoMov = document.getElementById('flecha');
	switch (direccion) {
		case codigosDireccion.ARRIBA:
			ultimoMov.textContent = '↑';
			break;
		case codigosDireccion.ABAJO:
			ultimoMov.textContent = '↓';
			break;
		case codigosDireccion.DERECHA:
			ultimoMov.textContent = '→';
			break;
		case codigosDireccion.IZQUIERDA:
			ultimoMov.textContent = '←';
			break;
	}
}

/* Esta función permite agregar una instrucción a la lista
con idLista. Se crea un elemento li dinámicamente con el texto 
pasado con el parámetro "instrucción". */
function mostrarInstruccionEnLista(instruccion, idLista) {
	var ul = document.getElementById(idLista);
	var li = document.createElement("li");
	li.textContent = instruccion;
	ul.appendChild(li);
}

/* Función que mezcla las piezas del tablero una cantidad de veces dada.
Se calcula una posición aleatoria y se mueve en esa dirección. De esta forma
se mezclará todo el tablero. */

function mezclarPiezas(veces) {
	if (veces <= 0) {
		return;
	}

	var direcciones = [codigosDireccion.ABAJO, codigosDireccion.ARRIBA,
	codigosDireccion.DERECHA, codigosDireccion.IZQUIERDA
	];

	var direccion = direcciones[Math.floor(Math.random() * direcciones.length)];
	moverEnDireccion(direccion);

	setTimeout(function () {
		mezclarPiezas(veces - 1);
	}, 100);
}

/* capturarTeclas: Esta función captura las teclas presionadas por el usuario. Javascript
permite detectar eventos, por ejemplo, cuando una tecla es presionada y en 
base a eso hacer algo. No es necesario que entiendas como funciona esto ahora, 
en el futuro ya lo vas a aprender. Por ahora, sólo hay que entender que cuando
se toca una tecla se hace algo en respuesta, en este caso, un movimiento */
function capturarTeclas() {
	document.body.onkeydown = (function (evento) {
		if (evento.which === codigosDireccion.ABAJO ||
			evento.which === codigosDireccion.ARRIBA ||
			evento.which === codigosDireccion.DERECHA ||
			evento.which === codigosDireccion.IZQUIERDA) {

			moverEnDireccion(evento.which);

			var gano = chequearSiGano();
			if (gano) {
				setTimeout(function () {
					mostrarCartelGanador();
				}, 500);
			}
			evento.preventDefault();
		}
	})
}

/* Se inicia el rompecabezas mezclando las piezas 60 veces 
y ejecutando la función para que se capturen las teclas que 
presiona el usuario */
function iniciar() {
	mostrarInstrucciones(instrucciones);
	mezclarPiezas(30);
	capturarTeclas();
}

// Ejecutamos la función iniciar
iniciar();