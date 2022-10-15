const { Router } = require("express");
const productoController = require('../controllers/producto.js')
const routerProducto = Router();
// const admin = require('../middleware/authorization.js')

routerProducto.get('/productos', (req, res) => {
    productoController.obtenerTodos(req, res)
})

routerProducto.get('/productos/:id', (req, res) => {
    productoController.obtenerPorId(req, res)

})

routerProducto.get('/productos/cat/:categoria', (req, res) => {
    productoController.obtenerPorCategoria(req, res)
})


routerProducto.post("/productos", (req, res, next) => {
    productoController.agregarItem(req, res, next)
});

routerProducto.put('/productos/:id', (req, res) => {
    productoController.actualizarItem(req, res)
})

routerProducto.delete("/productos/:id", (req, res, next) => {
    productoController.eliminarItem(req, res, next)
})

module.exports = routerProducto;