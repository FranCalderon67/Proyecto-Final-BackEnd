const Contenedor = require('../contenedor/contenedorMongo.js')
const mongoDbUri = require('../config/mongoConfig.js')

const carritoDao = new Contenedor(mongoDbUri, "proyecto", "carritos");

module.exports = carritoDao;