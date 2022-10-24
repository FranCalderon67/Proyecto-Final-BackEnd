const { Router } = require('express')
const controllerChat = require('../controllers/chat.js')
const routerChat = Router()

routerChat.get('/chat', (req, res) => {
    controllerChat.obtenerTodos(req, res)
})

routerChat.post("/chat", (req, res) => {
    controllerChat.agregarMsj(req, res)
});

routerChat.get('/chat/:email', (req, res) => {
    controllerChat.getMensajesUsuario(req, res)
})


module.exports = routerChat;