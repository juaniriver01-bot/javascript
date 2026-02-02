let carrito = [];
let total = 0;

// DOM
const formulario = document.getElementById("formProducto");
const lista = document.getElementById("listaProductos");
const totalSpan = document.getElementById("total");

// Cargar productos desde JSON
fetch("data/productos.json")
  .then(response => response.json())
  productos.forEach(producto => {
  const li = document.createElement("li");
  li.textContent = `${producto.nombre} - $${producto.precio}`;
  lista.appendChild(li);
});

// Evento formulario
formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const precio = Number(document.getElementById("precio").value);

  agregarProducto(nombre, precio);
  formulario.reset();
});

// Función principal
function agregarProducto(nombre, precio) {
  carrito.push({ nombre, precio });
  total += precio;

  const li = document.createElement("li");
  li.textContent = `${nombre} - $${precio}`;
  lista.appendChild(li);

  totalSpan.textContent = total;
}
Swal.fire({
  icon: "success",
  title: "Producto agregado",
  text: "Se agregó correctamente al carrito",
  timer: 1200,
  showConfirmButton: false
});

