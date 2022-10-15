const { Router } = require('express')
const controllerChat = require('../controllers/chat.js')
const routerChat = Router()

routerChat.get('/mensajes', (req, res) => {
    controllerChat.obtenerTodos(req, res)
})

routerChat.post("/mensajes", (req, res) => {
    controllerChat.agregarMsj(req, res)
});



module.exports = routerChat;