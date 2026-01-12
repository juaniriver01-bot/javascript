
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


const form = document.getElementById("productForm");
const listaProductos = document.getElementById("listaProductos");
const totalSpan = document.getElementById("total");


form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const precio = parseFloat(document.getElementById("precio").value);

    if (nombre === "" || precio <= 0) {
        return;
    }

    const producto = {
        nombre: nombre,
        precio: precio
    };

    carrito.push(producto);
    guardarCarrito();
    mostrarCarrito();

    form.reset();
});


function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}


function mostrarCarrito() {
    listaProductos.innerHTML = "";
    let total = 0;

    carrito.forEach((producto) => {
        const li = document.createElement("li");
        li.textContent = `${producto.nombre} - $${producto.precio}`;
        listaProductos.appendChild(li);
        total += producto.precio;
    });

    totalSpan.textContent = total;
}

mostrarCarrito();
