//Imports de express
const express = require("express");
const app = express();
// const { engine } = require("express-handlebars");
const session = require("express-session");
const cors = require('cors')
//Imports de Mongo
const MongoStore = require("connect-mongo");
const MongoUri = require("./config/mongoConfig.js");

//Imports de Socket y Server
const { Server: HttpServer } = require("http");
const httpServer = new HttpServer(app);
// const { Server: SocketServer } = require("socketio");
const { Server: SocketServer } = require('socket.io')
const socketServer = new SocketServer(httpServer);


//Imports de Funcionalidad

const chatSocket = require("./WebSockets/webSocketMensajes.js");
const productosSocket = require("./WebSockets/webSocketProducto.js");
const routerUsuario = require("./routes/rutasUsuario.js");
const routerCarrito = require('./routes/rutasCarrito.js')
const routerProducto = require('./routes/rutasProducto.js')
const routerChat = require('./routes/rutasChat.js')
const routerHomeWeb = require("./utils/home.js");
const routerPrefijo = require('./utils/prefijos.js')
// const yargs = require("yargs");
// const argumentos = process.argv.slice[2];
const { logger } = require('./config/logs.js')
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.set("views", "./public");
// app.set("view engine", "hbs");

// app.engine(
//     "hbs",
//     engine({
//         extname: ".hbs",
//         defaultLayout: "index.hbs",
//     })
// );

//Guardo en MONGO los datos y cookie de sesion
app.use(
    session({
        store: MongoStore.create({ mongoUrl: MongoUri }),
        secret: "coderhouse",
        resave: false,
        saveUninitialized: false,
        rolling: true,
        cookie: {
            maxAge: 60000,
        },
    })
);

//Rutas
app.use(routerUsuario);
app.use(routerHomeWeb);
app.use(routerCarrito)
app.use(routerProducto)
app.use(routerPrefijo)
app.use(routerChat)


//Coneccion de Sockets


socketServer.on("connection", async (socket) => {
    chatSocket(socket, socketServer.sockets);
    productosSocket(socket, socketServer.sockets);

});



// imports de Cluster
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;

const parseArgs = require("minimist");

const args = parseArgs(process.argv.slice(2), { alias: { p: "port", m: "modo" }, default: { port: 8080, modo: "FORK" } });
const PORT = args.port;
if (args.modo === "CLUSTER") {
    if (cluster.isPrimary) {
        for (let i = 0; i < numCPUs; i++) {
            console.log(`Escuchando en el puerto ${PORT}`);
            cluster.fork();
        }
    }
    else {
        httpServer.listen(PORT, () => { });
        httpServer.on("error", (error) => console.error(error, logger.error('Ups! Algo salio mal')));
        process.exit()
    }
}
if (args.modo === "FORK") {
    httpServer.listen(PORT, () => {
        console.log(`Escuchando en el puerto ${httpServer.address().port}`);

    });
    httpServer.on("error", (error) => console.error(error, "error de conexión"));
}



// httpServer.listen(
//   yargs(argumentos)
//     .default({
//       port: 8080,
//     })
//     .alias({
//       p: "port",
//     }).argv,
//   () => {
//     console.log(`Servidor escuchando en puerto ${PORT}`);
//   }
// );

// httpServer.listen(PORT, () => {
//   console.log(`Servidor escuchando en puerto ${PORT}`)
// })