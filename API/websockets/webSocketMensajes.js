const chat = require("../Daos/daoChat.js");

const socketMensaje = async (socket, sockets) => {
  socket.emit("messages", await chat.obtenerTodos());

  socket.on("new_message", async (mensaje) => {
    mensaje.fyh = new Date().toLocaleString();
    await chat.agregarItem(mensaje);
    sockets.emit("messages", await chat.obtenerTodos());
  });
};

module.exports = socketMensaje;
