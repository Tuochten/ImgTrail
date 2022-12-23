/* Guardamos las imágenes en una constante */
const images = document.getElementsByClassName("image");

/* La primera imagen en aparecer debe ser la número 0 */
let globalIndex = 0,
    last = {x:0, y:0};

/* Esta función hace aparecer la imagen en el punto correcto, también, pasa la posición del mouse en el eje X e Y y finalmente cambia la imagen activa por la siguiente en el bucle*/
const activate = (image, x, y) => {
    image.style.left = `${x}px`;
    image.style.top = `${y}px`;

    image.dataset.status = "active";

    last = { x, y };
}

const distanceFromLast = (x, y) => {
    return Math.hypot(x - last.x, y - last.y);
}

/* Listener a los movimientos del mouse */
window.onmousemove = e => {
    if(distanceFromLast(e.clientX, e.clientY) > 150) {
        const lead = images[globalIndex % images.length],
              tail = images[(globalIndex - 5) % images.length];
        /* Pasamos este index (que es modificable y hace referencia al número de la imagen que se está mostrando) hacía una nueva función llamada "activate" */

        /* acá se llama a la función, se le pasa el index actual (número del 0 al 9), la posición del mouse en la ventana del cliente X e Y */
        activate(lead, e.clientX, e.clientY);

        /* Ocupamos tail para mantener visible solo 5 elementos y ocultar el 6,7,8... */
        if(tail) tail.dataset.status = "inactive";

        globalIndex++;
    }  
}