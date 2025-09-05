const productos = [
  { nombre: "Samsung Z Flip", precio: 1998000, imagen: "imagenes/galaxy_z_flip.avif" },
  { nombre: "Samsung 25Ultra", precio: 2000000, imagen: "imagenes/s25_ultra.webp" },
  { nombre: "Samsung 24Ultra", precio: 1998000, imagen: "imagenes/Samsung-Galaxy-S24-Ultra.png" },
  { nombre: "Samsung Z Fold", precio: 1598000, imagen: "imagenes/galaxy_z_fold.avif" },
  { nombre: "Samsung A21 s", precio: 1490000, imagen: "imagenes/galaxyA21s.png" },
  { nombre: "Samsung s9", precio: 1150000, imagen: "imagenes/samsung_s9.png" },
  { nombre: "Samsung s22", precio: 1700000, imagen: "imagenes/galaxy_s22.webp" },
  { nombre: "Iphone 14Pro", precio: 2200000, imagen: "imagenes/iphone_14pro.webp" },
  { nombre: "Iphone 15Plus", precio: 2380000, imagen: "imagenes/iphone_15plus.jpg" }
];


const contenedorProductos = document.querySelector(".productos");
const historialContenedor = document.getElementById("historial-carrito");
const contadorSpan = document.getElementById("contador");
const totalSpan = document.getElementById("total");


let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


function mostrarProductos() {
  contenedorProductos.innerHTML = "";

  productos.forEach((producto, index) => {
    const card = document.createElement("article");
    card.classList.add("producto");
    card.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <h3>${producto.nombre}</h3>
      <p>Precio: $${(producto.precio).toLocaleString()}</p>
      <button id="boton-${index}">Añadir al carrito</button>
    `;
    contenedorProductos.appendChild(card);

    const boton = document.getElementById(`boton-${index}`);
    boton.addEventListener("click", () => agregarAlCarrito(producto));
  });
}


function agregarAlCarrito(producto) {
  const existente = carrito.find(item => item.nombre === producto.nombre);
  if (existente) {
    existente.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }


  localStorage.setItem("carrito", JSON.stringify(carrito));


  actualizarResumen();
  imprimirCarritoEnHTML(carrito);
}


function actualizarResumen() {
  const cantidadTotal = carrito.reduce((total, item) => total + item.cantidad, 0);
  const totalPrecio = carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);

  contadorSpan.textContent = cantidadTotal;
  totalSpan.textContent = totalPrecio.toLocaleString();
}

function imprimirCarritoEnHTML(carrito) {
  historialContenedor.innerHTML = "";

  carrito.forEach(item => {
    const div = document.createElement("div");
    div.classList.add("item-historial");
    div.innerHTML = `
      <span>${item.nombre} (x${item.cantidad})</span>
      <span>$${(item.precio * item.cantidad).toLocaleString()}</span>
    `;
    historialContenedor.appendChild(div);
  });
}


mostrarProductos();
actualizarResumen();


if (carrito.length > 0) {
  imprimirCarritoEnHTML(carrito);
}