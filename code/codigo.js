const grupoA = document.getElementById("grupoA");
const grupoB = document.getElementById("grupoB");
const zona = document.getElementById("zona");
const mensaje = document.getElementById("mensaje");
const fresaOrigen = document.getElementById("fresaOrigen");

let total = 0;

// Número entero aleatorio entre min y max (ambos incluidos)
function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Dibuja n fresas dentro de un contenedor (grupoA, grupoB o la zona de resultado)
function dibujar(contenedor, n) {
    contenedor.innerHTML = "";
    for (let i = 0; i < n; i++) {
        const img = document.createElement("img");
        img.src = "fresa.png";
        img.alt = "fresa";
        contenedor.appendChild(img);
    }
}

function nuevaSuma() {
    const a = aleatorio(1, 10);
    let b;
    do {
        b = aleatorio(1, 10);
    } while (b === a);          // los dos números deben ser diferentes

    total = a + b;
    dibujar(grupoA, a);
    dibujar(grupoB, b);
    zona.innerHTML = "";
    mensaje.textContent = "";
    mensaje.className = "mensaje";
}

// --- Arrastrar y soltar con clonación ---
fresaOrigen.addEventListener("dragstart", function (e) {
    e.dataTransfer.setData("text/plain", "fresa");
    e.dataTransfer.effectAllowed = "copy";
});

zona.addEventListener("dragover", function (e) {
    e.preventDefault();                 // sin esto el navegador no permite soltar
    zona.classList.add("encima");
});

zona.addEventListener("dragleave", function () {
    zona.classList.remove("encima");
});

zona.addEventListener("drop", function (e) {
    e.preventDefault();
    zona.classList.remove("encima");
    if (zona.children.length >= 20) return;

    const clon = fresaOrigen.cloneNode();   // copia de la fresa; la original se queda en la esquina
    clon.removeAttribute("id");
    clon.className = "";
    clon.draggable = false;
    clon.title = "Clic para quitar";
    clon.addEventListener("click", function () {
        clon.remove();
    });
    zona.appendChild(clon);
});

// --- Botones ---
document.getElementById("btnVerificar").addEventListener("click", function () {
    const cantidad = zona.children.length;
    if (cantidad === 0) {
        mensaje.textContent = "Arrastra fresas a la cesta 🍓";
        mensaje.className = "mensaje error";
    } else if (cantidad === total) {
        mensaje.textContent = "¡Muy bien! Es correcto 🎉";
        mensaje.className = "mensaje ok";
    } else {
        mensaje.textContent = "Casi... ¡inténtalo otra vez!";
        mensaje.className = "mensaje error";
    }
});

document.getElementById("btnReiniciar").addEventListener("click", nuevaSuma);

nuevaSuma();
