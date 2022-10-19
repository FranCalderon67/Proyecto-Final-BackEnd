const { Router } = require('express')
const routerCarrito = Router()
// const controllerCarrito = require('../controllers/carrito.js')
const usuarioDao = require('../Daos/daoUsuario.js')
const { notifyOrder } = require('../config/nodemailer.js')
const { enviarMsnCompra, enviarMsnCompraCliente } = require('../config/twilio.js')
const productoDao = require('../Daos/daoProducto.js')


// routerCarrito.get('/carrito', (req, res) => {
//     controllerCarrito.obtenerTodos(req, res)
// })




// routerCarrito.post('/carrito', async (req, res) => {
//     controllerCarrito.agregarItem(req, res)
// })


// routerCarrito.put('/carrito/:id', (req, res) => {
//     controllerCarrito.actualizarItem(req, res)
// })

// routerCarrito.delete('/carrito/:id', (req, res) => {
//     controllerCarrito.eliminarItem(req, res)
// })

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
    const activeUser = await usuarioDao.obtenerUsuario(req.session?.passport.user.username.email)

    const producto = await productoDao.eliminarItem(id)

    const nuevoCarrito = [...activeUser.carrito, producto]

    await usuarioDao.actualizarItem(activeUser._id, { "carrito": nuevoCarrito })

    res.redirect('/home')
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
    res.send("compra realizada")
})



// routerCarrito.post('/pago', async (req, res) => {
//     const activeUser = await usuarioDao.obtenerUsuario(req.session.passport.user.username.email)
//     console.log(activeUser)
//     notifyOrder(activeUser)
//     enviarMsnCompra(activeUser)
//     enviarMsnCompraCliente(activeUser)
//     res.send("Compra realizada")
// })


module.exports = routerCarrito;