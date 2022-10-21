const chat = require('../Daos/daoChat.js');
const usuarioDao = require("../Daos/daoUsuario.js")
const controllerChat = {}

controllerChat.obtenerTodos = async (req, res) => {
    try {
        const mensaje = await chat.obtenerTodos()
        return res.json(mensaje)
    } catch (error) {
        console.log('ERROR=>', error)
    }
}

controllerChat.agregarMsj = async (req, res) => {
    try {
        const mensaje = {
            author: {
                email: req.body.username,
                nombre: req.body.firstname,
                apellido: req.body.lastname,
                edad: req.body.age,
                alias: req.body.alias,
                avatar: req.body.avatar,
            },
            text: req.body.text,
            fyh: new Date().toLocaleString()
        };
        if (mensaje.username === "" || mensaje.text === "") {
            res.send(alert('Algunos campos estan vacios'))
        } else {
            await chat.agregarItem(mensaje);
            const activeUser = await usuarioDao.obtenerUsuario(req.session?.passport.user.username.email)
            const nuevoChat = [...activeUser.mensajes, mensaje]
            await usuarioDao.actualizarItem(activeUser._id, { "mensajes": nuevoChat })
        }
    } catch (error) {
        console.log('ERROR=>', error)
    }
}

controllerChat.getMensajesUsuario = async (req, res) => {
    const email = req.params.email
    try {
        const activeUser = await usuarioDao.obtenerUsuario(email)
        res.send(activeUser.mensajes)
    } catch (error) {
        console.log("ERROR=>", error)
    }



}


module.exports = controllerChat