let carrito = [];
let total = 0;

// DOM
const listaProductos = document.getElementById("listaProductos");
const listaCarrito = document.getElementById("listaCarrito");
const totalSpan = document.getElementById("total");


// Cargar carrito desde localStorage
carrito = JSON.parse(localStorage.getItem("carrito")) || [];
total = carrito.reduce((acc, prod) => acc + prod.precio, 0);
totalSpan.textContent = total;

carrito.forEach(prod => {
  const li = document.createElement("li");
  li.textContent = `${prod.nombre} - $${prod.precio}`;
  listaProductos.appendChild(li);

 
});

// Guardar carrito
function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Cargar productos desde JSON
fetch("data/productos.json")
  .then(response => response.json())
  .then(productos => {
    productos.forEach(producto => {
      const li = document.createElement("li");
      li.innerHTML = `
        ${producto.nombre} - $${producto.precio}
        <button onclick="agregarProducto('${producto.nombre}', ${producto.precio})">
          Agregar
        </button>
      `;
      listaCarrito.appendChild(li);

    });
  });

// Función agregar producto al carrito
function agregarProducto(nombre, precio) {
  carrito.push({ nombre, precio });
  total += precio;

  const li = document.createElement("li");
  li.textContent = `${nombre} - $${precio}`;
  listaCarrito.appendChild(li);



  totalSpan.textContent = total;
  guardarCarrito();

  Swal.fire({
    icon: "success",
    title: "Producto agregado",
    text: "Se agregó correctamente al carrito",
    timer: 1200,
    showConfirmButton: false
  });
}
document.getElementById("vaciar").addEventListener("click", () => {
  carrito = [];
  total = 0;
  listaCarrito.innerHTML = "";
  totalSpan.textContent = 0;
  localStorage.removeItem("carrito");

  Swal.fire("Carrito vacío", "", "info");
});

