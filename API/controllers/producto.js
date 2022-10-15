const producto = require('../Daos/daoProducto.js')

const controllersProducto = {}

controllersProducto.obtenerTodos = async (req, res) => {
    try {
        const productos = await producto.obtenerTodos()
        return res.json(productos)
    } catch (error) {
        console.log('ERROR=>', error)
    }
}

controllersProducto.obtenerPorId = async (req, res) => {
    const id = req.params.id
    try {
        const buscado = await producto.obtenerPorId(id)
        return res.json(buscado)
    } catch (error) {
        console.log("ERROR=>", error)
    }
}

controllersProducto.obtenerPorCategoria = async (req, res) => {
    const categoria = req.params.categoria;
    try {
        const categoriaBuscada = await producto.obtenerPorCategoria(categoria)
        return res.json(categoriaBuscada)
    } catch (error) {
        console.log('ERROR=>', error)
    }
}

controllersProducto.agregarItem = async (req, res, next) => {
    const prod = req.body
    try {
        if (prod.nombre === "" || prod.precio === "" || prod.imagen === "" || prod.category === "") {
            res.send(alert('Algunos campos del producto estan vacios'))
        } else {
            await producto.agregarItem(prod);
            next()
            res.redirect("http://localhost:3000/");
            // res.json(producto.obtenerTodos())
        }
    } catch (error) {
        console.log('ERROR=>', error)
    }
}


controllersProducto.actualizarItem = async (req, res) => {
    const id = req.params.id
    const data = req.body
    try {
        console.log(data)
        await producto.actualizarItem(id, data)
    } catch (error) {
        console.log('ERROR=>', error)
    }
}


controllersProducto.eliminarItem = async (req, res, next) => {
    const id = req.params.id
    try {
        await producto.eliminarItem(id)
        next()
        res.redirect("http://localhost:3000");
    } catch (error) {
        console.log("ERROR=>", error)
    }
}





module.exports = controllersProducto