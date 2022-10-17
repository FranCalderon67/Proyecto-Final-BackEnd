const carrito = require('../Daos/daoCarrito.js');

const controllerCarrito = {}

controllerCarrito.obtenerTodos = async (req, res) => {
    try {
        const carritos = await carrito.obtenerTodos()
        return res.json(carritos)
    } catch (error) {
        console.log("ERROR=>", error)
    }

}

controllerCarrito.agregarItem = async (req, res) => {
    try {
        const nuevoCarrito = await carrito.agregarItem(req.body)
        res.json(nuevoCarrito)
    } catch (error) {
        console.log('ERROR=>', error)
    }
}

controllerCarrito.actualizarItem = async (req, res) => {
    const id = req.params.id
    const data = req.body
    try {
        await carrito.actualizarItem(id, data)
    } catch (error) {
        console.log('ERROR=>', error)
    }
}


controllerCarrito.eliminarItem = async (req, res) => {
    const id = req.params.id
    try {
        await carrito.eliminarItem(id)

        res.send('Carrito Eliminado')
    } catch (error) {
        console.log("ERROR=>", error)
    }
}


module.exports = controllerCarrito