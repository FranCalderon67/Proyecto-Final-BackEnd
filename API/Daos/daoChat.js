const Contenedor = require('../contenedor/contenedorMongo.js')
const mongoDbUri = require('../config/mongoConfig.js')

const chatDao = new Contenedor(mongoDbUri, "proyecto", "chats");

module.exports = chatDao;