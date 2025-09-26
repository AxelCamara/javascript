document.addEventListener("DOMContentLoaded", () => {
  const detalleCarrito = document.getElementById("detalle-carrito");
  const cantidadSpan = document.getElementById("cantidad");
  const totalSpan = document.getElementById("total");
  const vaciarBtn = document.getElementById("vaciar-carrito");
  const formCompra = document.getElementById("form-compra");

  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


  function mostrarMensaje({ icon = "info", title = "", html = "", timer = 1500 }) {
    Swal.fire({
      icon,
      title,
      html,
      showConfirmButton: timer === 0 ? true : false,
      timer: timer > 0 ? timer : undefined,
      toast: timer > 0,
      position: "top-end"
    });
  }


  function guardarCarrito() {
    try {
      localStorage.setItem("carrito", JSON.stringify(carrito));
    } catch (error) {
      mostrarMensaje({ icon: "error", title: "Error al guardar el carrito" });
    }
  }


  function mostrarCarrito() {
    try {
      detalleCarrito.innerHTML = "";

      if (!carrito || carrito.length === 0) {
        detalleCarrito.innerHTML = "<p>Tu carrito está vacío</p>";
        cantidadSpan.textContent = "0";
        totalSpan.textContent = "0.00";
        return;
      }

      carrito.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "item-carrito";
        div.innerHTML = `
          <img src="${item.imagen}" alt="${item.nombre}" width="80">
          <span class="nombre">${item.nombre} (x${item.cantidad})</span>
          <span class="subtotal">$${(item.precio * item.cantidad).toLocaleString()}</span>
        `;


        const btnEliminar = document.createElement("button");
        btnEliminar.type = "button";
        btnEliminar.textContent = "Eliminar";
        btnEliminar.addEventListener("click", () => {
          try {
            carrito[index].cantidad--;
            if (carrito[index].cantidad === 0) {
              carrito.splice(index, 1);
            }
            guardarCarrito();
            mostrarCarrito();
            mostrarMensaje({ icon: "info", title: `${item.nombre} eliminado del carrito` });
          } catch (error) {
            mostrarMensaje({ icon: "error", title: "Error al eliminar el producto" });
          }
        });

        div.appendChild(btnEliminar);
        detalleCarrito.appendChild(div);
      });

      const cantidadTotal = carrito.reduce((acc, p) => acc + p.cantidad, 0);
      const totalPrecio = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

      cantidadSpan.textContent = cantidadTotal;
      totalSpan.textContent = totalPrecio.toLocaleString();
    } catch (error) {
      mostrarMensaje({ icon: "error", title: "Error al mostrar el carrito" });
    }
  }


  if (vaciarBtn) {
    vaciarBtn.addEventListener("click", () => {
      try {
        if (carrito.length === 0) {
          mostrarMensaje({ icon: "warning", title: "El carrito ya está vacío" });
          return;
        }

        carrito = [];
        localStorage.removeItem("carrito");
        mostrarCarrito();
        mostrarMensaje({ icon: "success", title: "Carrito vaciado" });
      } catch (error) {
        mostrarMensaje({ icon: "error", title: "Error al vaciar el carrito" });
      }
    });
  }


  if (formCompra) {
    formCompra.addEventListener("submit", (e) => {
      e.preventDefault();
      try {
        const nombre = document.getElementById("nombre").value.trim();
        const email = document.getElementById("email").value.trim();

        if (!nombre || !email) {
          mostrarMensaje({ icon: "warning", title: "Por favor completá todos los campos" });
          return;
        }

        if (carrito.length === 0) {
          mostrarMensaje({ icon: "error", title: "Tu carrito está vacío" });
          return;
        }

        mostrarMensaje({
          icon: "success",
          title: `¡Gracias ${nombre}!`,
          html: `Tu compra se ha realizado correctamente.<br><b>Total pagado: $${totalSpan.textContent}</b>`,
          timer: 0
        });

        carrito = [];
        localStorage.removeItem("carrito");
        mostrarCarrito();
        formCompra.reset();
      } catch (error) {
        mostrarMensaje({ icon: "error", title: "Error al procesar la compra" });
      }
    });
  }

  mostrarCarrito();
});
