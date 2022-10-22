//Imports de express
const express = require("express");
const app = express();
const { engine } = require('express-handlebars')
const session = require("express-session");
const cors = require('cors')

//Imports de Mongo
const MongoStore = require("connect-mongo");
const MongoUri = require("./config/mongoConfig.js");

//Imports de Socket y Server
const { Server: HttpServer } = require("http");
const httpServer = new HttpServer(app);
const { Server: SocketServer } = require('socket.io')
const socketServer = new SocketServer(httpServer);


//Imports de Funcionalidad

const chatSocket = require("./API/websockets/webSocketMensajes.js");
const productosSocket = require("./API/websockets/webSocketProducto.js");
const routerUsuario = require("./API/routes/rutasUsuario.js");
const routerCarrito = require('./API/routes/rutasCarrito.js')
const routerProducto = require('./API/routes/rutasProducto.js')
const routerChat = require('./API/routes/rutasChat.js')
const routerHomeWeb = require("./API/utils/home.js");
const routerPrefijo = require('./API/utils/prefijos.js')

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.set("views", "./public/hbsViews");
app.set("view engine", "hbs");

app.engine(
    "hbs",
    engine({
        extname: ".hbs",
        defaultLayout: "index.hbs",
    })
);

//Guardo en MONGO los datos y cookie de sesion

const sessionAge = process.env.SESSIONEXP || 60000

app.use(
    session({
        store: MongoStore.create({ mongoUrl: MongoUri }),
        secret: "coderhouse",
        resave: false,
        saveUninitialized: false,
        rolling: true,
        cookie: {
            maxAge: sessionAge,
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

const port = process.env.PORT || 8080

httpServer.listen(port, () => {
    console.log(`Servidor escuchando en puerto ${port}`)
})

