const socket = io();
const today = new Date().toLocaleString()

// MENSAJES

const inputUsername = document.getElementById("username");
const inputMensaje = document.getElementById("text");
const btnEnviar = document.getElementById("btnEnviar");

const enviarMensaje = document.getElementById("formularioMensaje");
enviarMensaje.addEventListener("submit", (e) => {
    e.preventDefault();

    const mensaje = {
        author: {
            email: inputUsername.value,
            nombre: document.getElementById("firstname").value,
            apellido: document.getElementById("lastname").value,
            edad: document.getElementById("age").value,
            alias: document.getElementById("alias").value,
            avatar: document.getElementById("avatar").value,
        },
        text: inputMensaje.value,
    };

    socket.emit("new_message", mensaje);
    enviarMensaje.reset();
    inputMensaje.focus();
});

function crearEtiquetaMensaje(mensaje) {
    const { author, text } = mensaje;
    return `
    <div>
    <span ><img class="avatar" src=${author.avatar} alt="PERFIL"></img></span>
      <span class="autor">${author.alias} <span class="hora"> ${today}: </span></span>
      <span class="mensaje">${text}</span>
    </div>
  `;
}

const agregarMensajes = (mensajes) => {
    const mensajesFinal = mensajes.map((mensaje) => crearEtiquetaMensaje(mensaje)).join(" ");
    document.getElementById("messages").innerHTML = mensajesFinal;
};

socket.on("messages", (messages) => agregarMensajes(messages));

inputUsername.addEventListener("input", () => {
    const hayEmail = inputUsername.value.length;
    const hayTexto = inputMensaje.value.length;
    inputMensaje.disabled = !hayEmail;
    btnEnviar.disabled = !hayEmail || !hayTexto;
});

inputMensaje.addEventListener("input", () => {
    const hayTexto = inputMensaje.value.length;
    btnEnviar.disabled = !hayTexto;
});

//Productos
const enviarProducto = () => {
    let name = document.getElementById("nombreProducto").value;
    let price = document.getElementById("precioProducto").value;
    let image = document.getElementById("imagenProducto").value;
    let category = document.getElementById('categoriaProducto').value
    let description = document.getElementById("descripcionProducto").value
    const producto = { name, price, image, category, description };
    name = "";
    price = "";
    image = "";
    category = "";
    description = "",
        socket.emit("new_products", producto);
    return false;
};

const eliminarDeCarrito = (_id) => {

    fetch(`http://localhost:8080/carrito/:${_id}`, {
        method: 'DELETE',
        body: FormData
    }).then((res) => res.json())
        .catch((err) => { console.log(err) })

}

const crearEtiquetasProductos = (producto) => {
    const { name, image, price, _id } = producto;
    return `
  <div>
  <div class="card" style="width: 18rem;">
    <img src=${image} class="card-img-top" alt="IMAGEN" />
    <div class="card-body">
      <h5 class="card-title">${name}</h5>
      <p class="card-text">Precio ${price}</p>
      <p>ID:${_id}</p>
      <form action="/carrito/${_id}" method="POST">
      <button>Agregar al carrito</button>
      </form>
       <button onclick= "return eliminarDeCarrito(${_id})" id="eliminarDelCarrito">Eliminar de Carrito</button>
      </div>
  </div>
</div>`;
};

const agregarProducto = (producto) => {
    if (producto !== "") {
        const productoFinal = producto.map((producto) => crearEtiquetasProductos(producto)).join("<br>");

        document.getElementById("productos").innerHTML = productoFinal;
    } else {
        document.getElementById("productos").innerHTML = "<h2>No hay productos</h2>";
    }
};

socket.on("products", (products) => agregarProducto(products));

//Datos usuario ingreso

const saludoBienvenida = document.getElementById("bienvenido");
const btnCerrar = document.getElementById("btnCerrarSesion");
const saludoDespedida = document.getElementById("despedida");

fetch("/user")
    .then((res) => res.text())
    .then((user) => (saludoBienvenida.innerHTML = `Bienvenido/a ${user}`));

btnCerrar.addEventListener("click", async () => {
    const response = await fetch("/logout");
    const nombre = await response.text();

    saludoDespedida.textContent = `Hasta luego ${nombre}`;
    setTimeout(() => {
        location.href = "/";
    }, 2000);
});

const vaciarCarrito = document.getElementById('btnVaciarCarrito')

vaciarCarrito.addEventListener('click', (e) => {
    e.preventDefault()
    fetch('http://localhost:8080/carrito', {
        method: 'DELETE',
        body: FormData
    }).then((res) => res.json())
})



// const btnEliminarDelCarrito = document.getElementById('eliminarDelCarrito')

// btnEliminarDelCarrito.addEventListener('click', (e) => {
//     e.preventDefault();
//     fetch('http://localhost:8080/carrito/:_id', {
//         method: 'DELETE',
//         body: FormData
//     }).then((res) => res.json())
// })
