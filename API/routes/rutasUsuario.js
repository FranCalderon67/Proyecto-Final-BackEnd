const { Router } = require("express");
const path = require("path");
const passport = require("../config/passport.js");
const routerUsuario = Router();
const usuarioDao = require('../Daos/daoUsuario.js')

routerUsuario.use(passport.initialize());
// routerUsuario.use(passport.session());

routerUsuario.get("/login", (req, res) => {
    res.render(path.join(process.cwd(), "./public/hbsViews/login.hbs"));
});

routerUsuario.get("/signup", (req, res) => {
    res.render(path.join(process.cwd(), "./public/hbsViews/signup.hbs"));
});


routerUsuario.post("/login", passport.authenticate("login", { failureRedirect: "/failedLogin", successRedirect: "/home" }));

routerUsuario.post("/signup", passport.authenticate("signup", { failureRedirect: "/failedSignup", successRedirect: "/login" }));




routerUsuario.get("/failedLogin", (req, res) => {
    res.render(path.join(process.cwd(), "./public/hbsViews/errorLogin.hbs"));
});

routerUsuario.get("/failedSignup", (req, res) => {
    res.render(path.join(process.cwd(), "./public/hbsViews/errorSignup.hbs"));
});

routerUsuario.get("/logout", (req, res) => {
    const nombre = req.session?.email;
    if (nombre) {
        req.session.destroy((err) => {
            if (!err) {
                res.render(path.join(process.cwd(), "./public/hbsViews/logout.hbs"), { nombre: nombre });
            } else {
                res.redirect("/");
            }
        });
    } else {
        res.redirect("/");
    }
});

routerUsuario.get("/user", (req, res) => {
    if (req.session?.passport) {
        res.send(req.session.passport.user.username.nombre)
    } else {
        res.send("Invitado")
    }

});

routerUsuario.get('/test', (req, res) => {

    res.send(req.session.passport.user.username.email)
})



routerUsuario.get("/userdata", (req, res) => {

    if (req.session?.passport) {
        res.send(req.session.passport.user.username)
    } else {
        res.send("invitado")
    }
});



module.exports = routerUsuario;