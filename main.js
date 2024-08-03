var anchoCanvas = 700;
var altoCanvas = 300;
var canvas, contextoCanvas;

var framePorSegundo = 50;

var imagenDinosaurio;
var imagenNube;
var imagenCactus;
var imagenSuelo;
var imagenCielo;

var suelo = 200;
var atributosDinosaurio = {
    posiciony: suelo,
    velocidady: 0,
    gravedad: 2,
    salto: 28,
    velocidadymax: 9,
    saltando: false
};
var nivel = {
    velocidad: 9,
    marcador: 0,
    muerto: false,
    numeroNivel: 1
};
var cactus = {
    posicionx: anchoCanvas + 100,
    posiciony: suelo - 25,
    ancho: 38,  // Ancho del cactus
    alto: 85    // Alto del cactus
};
var nube = {
    posicionx: 400,
    posiciony: 100,
    velocidad: 1
};
var suelog = {
    posicionx: 0,
    posiciony: suelo + 30
};

var juegoIniciado = false;

document.addEventListener('keydown', function (evento) {
    if (evento.keyCode === 32) {
        if (!juegoIniciado) {
            juegoIniciado = true;
        } else {
            if (nivel.muerto) {
                reiniciarJuego();
            } else {
                saltar();
            }
        }
    }
});

function cargarImagenes() {
    imagenDinosaurio = new Image();
    imagenDinosaurio.src = 'IMG/DINOSAURIO.png';
    imagenNube = new Image();
    imagenNube.src = 'IMG/nube.png';
    imagenCactus = new Image();
    imagenCactus.src = 'IMG/cactus.png';
    imagenSuelo = new Image();
    imagenSuelo.src = 'IMG/suelo.png';
    imagenCielo = new Image();
    imagenCielo.src = 'IMG/cielo.png'; // Ruta a tu imagen de cielo
}

function inicializa() {
    canvas = document.getElementById('canvas');
    contextoCanvas = canvas.getContext('2d');
    cargarImagenes();
}

function borrarCanvas() {
    canvas.width = anchoCanvas;
    canvas.height = altoCanvas;
}

function dibujarDinosaurio() {
    contextoCanvas.drawImage(imagenDinosaurio, 0, 0, 500, 500, 100, atributosDinosaurio.posiciony, 50, 50);
}
function dibujarCielo() {
    contextoCanvas.drawImage(imagenCielo, 0, 0, anchoCanvas, altoCanvas - 50);
}

function dibujarCactus() {
    contextoCanvas.drawImage(imagenCactus, 0, 0, 46, 96, cactus.posicionx, cactus.posiciony, cactus.ancho, cactus.alto);
}

function movimientoCactus() {
    if (cactus.posicionx < -100) {
        cactus.posicionx = anchoCanvas + 100;
        nivel.marcador++;
    }
    cactus.posicionx -= nivel.velocidad;
}

function dibujaSuelo() {
    contextoCanvas.drawImage(imagenSuelo, suelog.posicionx, suelog.posiciony, 700, 96);
    contextoCanvas.drawImage(imagenSuelo, suelog.posicionx + 700, suelog.posiciony, 700, 96);
}

function movimientoSuelo() {
    suelog.posicionx -= nivel.velocidad;
    if (suelog.posicionx <= -700) {
        suelog.posicionx = 0;
    }
}

function dibujarNube() {
    contextoCanvas.drawImage(imagenNube, 0, 0, 92, 26, nube.posicionx, nube.posiciony, 92, 26);
}

function movimientoNube() {
    if (nube.posicionx < -100) {
        nube.posicionx = anchoCanvas + 100;
    }
    nube.posicionx -= nube.velocidad;
}

function saltar() {
    if (!atributosDinosaurio.saltando) {
        atributosDinosaurio.saltando = true;
        atributosDinosaurio.velocidady = atributosDinosaurio.salto;
    }
}

function gravedad() {
    if (atributosDinosaurio.saltando == true) {
        if (atributosDinosaurio.posiciony - atributosDinosaurio.velocidady - atributosDinosaurio.gravedad > suelo) {
            atributosDinosaurio.saltando = false;
            atributosDinosaurio.velocidady = 0;
            atributosDinosaurio.posiciony = suelo;
        } else {
            atributosDinosaurio.velocidady -= atributosDinosaurio.gravedad;
            atributosDinosaurio.posiciony -= atributosDinosaurio.velocidady;
        }
    }
}

function choque() {
    var dinosaurioLeft = 100;
    var dinosaurioRight = 100 + 50; // 50 es el ancho del dinosaurio
    var dinosaurioTop = atributosDinosaurio.posiciony;
    var dinosaurioBottom = atributosDinosaurio.posiciony + 50; // 50 es la altura del dinosaurio
    
    var cactusLeft = cactus.posicionx;
    var cactusRight = cactus.posicionx + cactus.ancho; // Ancho del cactus
    var cactusTop = cactus.posiciony;
    var cactusBottom = cactus.posiciony + cactus.alto; // Alto del cactus
    
    if (dinosaurioRight > cactusLeft && 
        dinosaurioLeft < cactusRight && 
        dinosaurioBottom > cactusTop && 
        dinosaurioTop < cactusBottom) {
        nivel.muerto = true;
        nivel.velocidad = 0;
        nube.velocidad = 0;
    }
}

function reiniciarJuego() {
    nivel.velocidad = 9;
    nivel.marcador = 0;
    nivel.muerto = false;
    nivel.numeroNivel = 1;

    atributosDinosaurio.posiciony = suelo;
    atributosDinosaurio.velocidady = 0;
    atributosDinosaurio.saltando = false;

    cactus.posicionx = anchoCanvas + 100;
    cactus.posiciony = suelo - 25;

    nube.posicionx = 400;
    nube.posiciony = 100;
    nube.velocidad = 1;

    suelog.posicionx = 0;

    cargarImagenes();
}

function puntuacion() {
    contextoCanvas.font = "20px impact";
    contextoCanvas.fillStyle = "#000000";
    contextoCanvas.fillText(`PUNTEO: ${nivel.marcador}`, 520, 50);
    contextoCanvas.fillText(`NIVEL: ${nivel.numeroNivel}`, 120, 50);

    if (nivel.muerto == true) {
        contextoCanvas.font = "60px impact";
        contextoCanvas.fillText("FIN DEL JUEGO", 150, 150);
    }
}

function mostrarInicio() {
    contextoCanvas.font = "30px Arial";
    contextoCanvas.fillStyle = "#000000";
    contextoCanvas.fillText("Presiona la barra espaciadora para comenzar", 50, 150);
}

function principal() {
    borrarCanvas();

    if (!juegoIniciado) {
        mostrarInicio();
        return;
    }
    dibujarCielo();
    choque();
    movimientoSuelo();
    movimientoCactus();
    movimientoNube();
    dibujaSuelo();
    dibujarNube();
    dibujarDinosaurio();
    dibujarCactus();
    gravedad();
    puntuacion();
}

window.onload = function () {
    inicializa();
    setInterval(function () {
        principal();
    }, 1000 / framePorSegundo);
};
