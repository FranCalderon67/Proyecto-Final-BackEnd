const { Router } = require('express')
const routerCarrito = Router()
const path = require('path')
const usuarioDao = require('../Daos/daoUsuario.js')
const { notifyOrder } = require('../config/nodemailer.js')
const { enviarMsnCompra, enviarMsnCompraCliente } = require('../config/twilio.js')
const carritoDao = require('../Daos/daoCarrito.js')

routerCarrito.get('/carrito', async (req, res) => {
    res.render(path.join(process.cwd(), "./public/hbsViews/carrito.hbs"));
})


routerCarrito.post('/carrito', async (req, res) => {
    carritoDao.agregarItem(req.body)
})

routerCarrito.post('/carrito/:_id', async (req, res) => {
    const id = req.params._id
    const producto = await productoDao.obtenerPorId(id)

    const activeUser = await usuarioDao.obtenerUsuario(req.session.passport.user.username.email)
    console.log(activeUser)
    const nuevoCarrito = [...activeUser.carrito, producto]

    await usuarioDao.actualizarItem(activeUser._id, { "carrito": nuevoCarrito })

    // res.redirect('http://localhost:3000/')
})



routerCarrito.post('/pago', async (req, res) => {
    const activeUser = await usuarioDao.obtenerUsuario(req.session.passport.user.username.email)
    console.log(activeUser)
    notifyOrder(activeUser)
    enviarMsnCompra(activeUser)
    enviarMsnCompraCliente(activeUser)
    res.redirect('http://localhost:3000/comprafinalizada')
})


module.exports = routerCarrito;