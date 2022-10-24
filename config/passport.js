const passport = require("passport")
const LocalStrategy = require('passport-local')
const bcrypt = require('bcryptjs')

const usuarios = require('../Daos/daoUsuario.js')
const { notifyNewUser } = require('../config/nodemailer.js')
const { enviarMsn } = require('../config/twilio.js')

usuarios.conectarMongo()




passport.use(
    "signup",
    new LocalStrategy(
        {
            passReqToCallback: true,
            usernameField: "email",
            passwordField: "password",
        },
        async (req, email, password, done) => {

            try {
                const userExists = await usuarios.obtenerUsuario(email);
                if (userExists) {
                    return done(null, false);
                } else {
                    const newUser = {
                        nombre: req.body.nombre,
                        apellido: req.body.apellido,
                        edad: req.body.edad,
                        direccion: req.body.direccion,
                        numeracion: req.body.numeracion,
                        ciudad: req.body.ciudad,
                        provincia: req.body.provincia,
                        pais: req.body.pais,
                        prefijo: req.body.prefijo,
                        telefono: req.body.telefono,
                        email: email,
                        password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
                        carrito: [],
                        mensajes: []
                    }
                    console.log("nuevo usuario=>", newUser)
                    notifyNewUser(newUser)
                    enviarMsn(newUser)
                    const usuarioCreado = usuarios.agregarItem(newUser)
                    return done(null, usuarioCreado);
                }
            } catch (error) {
                console.log("error=>", error);
            }
        }
    )
);

passport.use(
    "login",
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password"
        },

        async (email, password, callback) => {
            try {
                const user = await usuarios.obtenerUsuario(email);


                if (!user || !bcrypt.compareSync(password, user.password)) {
                    return callback(null, false);
                } else {
                    return callback(null, user);
                }
            } catch (error) {
                console.log("ERROR=>", error);
                return callback(null, false);
            }
        }
    )
);




passport.serializeUser((user, done) => {
    done(null, { id: user.id, username: user });
});

passport.deserializeUser(async (usr, done) => {
    try {
        const user = await usuarios.obtenerUsuario("username", usr.email);
        return done(null, user);
    } catch (error) {
        return done(error, false);
    }
});

module.exports = passport;