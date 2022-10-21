const { Router } = require('express')
const routerCarrito = Router()
const usuarioDao = require('../Daos/daoUsuario.js')
const { notifyOrder } = require('../config/nodemailer.js')
const { enviarMsnCompra, enviarMsnCompraCliente } = require('../config/twilio.js')
const productoDao = require('../Daos/daoProducto.js')
const { ObjectId } = require('mongodb')


routerCarrito.get("/carrito", async (req, res) => {
    const activeUser = await usuarioDao.obtenerUsuario(req.session?.passport.user.username.email)
    res.send(activeUser.carrito)
})


routerCarrito.post('/carrito/:_id', async (req, res) => {
    const id = req.params._id
    const producto = await productoDao.obtenerPorId(id)
    const activeUser = await usuarioDao.obtenerUsuario(req.session?.passport.user.username.email)
    const nuevoCarrito = [...activeUser.carrito, producto]
    await usuarioDao.actualizarItem(activeUser._id, { "carrito": nuevoCarrito })
    res.redirect('/home')
})


routerCarrito.delete('/carrito/:_id', async (req, res) => {
    const id = req.params._id
    console.log(id)
    const activeUser = await usuarioDao.obtenerUsuario(req.session?.passport.user.username.email)
    console.log(activeUser)
    const carritoFiltrado = activeUser.carrito.filter((e) => e._id.toString() != id)
    console.log(carritoFiltrado)
    await usuarioDao.actualizarItem(activeUser._id, { "carrito": carritoFiltrado })
    // res.redirect('/home')
})

routerCarrito.delete('/carrito', async (req, res) => {
    const activeUser = await usuarioDao.obtenerUsuario(req.session?.passport.user.username.email)
    const nuevoCarrito = []
    await usuarioDao.actualizarItem(activeUser._id, { "carrito": nuevoCarrito })
    res.redirect('/home')
})


routerCarrito.post('/pago', async (req, res) => {
    const activeUser = await usuarioDao.obtenerUsuario(req.session?.passport.user.username.email)
    notifyOrder(activeUser)
    enviarMsnCompra(activeUser)
    enviarMsnCompraCliente(activeUser)
    res.redirect('/home')
})




module.exports = routerCarrito;