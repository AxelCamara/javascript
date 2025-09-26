document.addEventListener("DOMContentLoaded", () => {
  const contenedorProductos = document.querySelector(".productos");
  const contadorSpan = document.getElementById("contador");
  const totalSpan = document.getElementById("total");
  const irCarritoBtn = document.getElementById("ir-carrito");

  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  let productos = [];


  function mostrarMensaje({ icon = 'info', title = '', html = '', timer = 1500 }) {
    Swal.fire({
      icon,
      title,
      html,
      showConfirmButton: false,
      timer,
      toast: true,
      position: 'top-end'
    });
  }

  async function cargarProductos() {
    try {
      const response = await fetch("data/productos.json");
      if (!response.ok) throw new Error("Error al cargar productos");
      productos = await response.json();
      mostrarProductos();
      actualizarResumen();
    } catch (error) {
      mostrarMensaje({ icon: 'error', title: 'No se pudieron cargar los productos' });
      console.error(error);
    }
  }


  function mostrarProductos() {
    try {
      contenedorProductos.innerHTML = "";
      productos.forEach((producto, index) => {
        const card = document.createElement("article");
        card.classList.add("producto");
        card.innerHTML = `
          <img src="${producto.imagen}" alt="${producto.nombre}">
          <h3>${producto.nombre}</h3>
          <p>Precio: $${producto.precio.toLocaleString()}</p>
          <button id="boton-${index}">Añadir al carrito</button>
        `;
        contenedorProductos.appendChild(card);

        const boton = document.getElementById(`boton-${index}`);
        boton.addEventListener("click", () => agregarAlCarrito(producto));
      });
    } catch (error) {
      mostrarMensaje({ icon: 'error', title: 'Error al mostrar productos' });
      console.error(error);
    }
  }


  function agregarAlCarrito(producto) {
    try {
      const existente = carrito.find(item => item.nombre === producto.nombre);
      if (existente) {
        existente.cantidad++;
      } else {
        carrito.push({ ...producto, cantidad: 1 });
      }
      localStorage.setItem("carrito", JSON.stringify(carrito));
      actualizarResumen();
      mostrarMensaje({ icon: 'success', title: `${producto.nombre} agregado al carrito` });
    } catch (error) {
      mostrarMensaje({ icon: 'error', title: 'Error al agregar al carrito' });
      console.error(error);
    }
  }


  function actualizarResumen() {
    try {
      const cantidadTotal = carrito.reduce((total, item) => total + item.cantidad, 0);
      const totalPrecio = carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);
      contadorSpan.textContent = cantidadTotal;
      totalSpan.textContent = totalPrecio.toLocaleString();
    } catch (error) {
      mostrarMensaje({ icon: 'error', title: 'Error al actualizar resumen' });
      console.error(error);
    }
  }


  if (irCarritoBtn) {
    irCarritoBtn.addEventListener("click", () => {
      try {
        window.location.href = "carrito.html";
      } catch (error) {
        mostrarMensaje({ icon: 'error', title: 'Error al abrir el carrito' });
        console.error(error);
      }
    });
  }


  cargarProductos();
});
