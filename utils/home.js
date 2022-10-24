const { Router } = require("express");

const path = require("path");
const productosWebRouter = Router();

productosWebRouter.get("/", (req, res) => {
  res.render(path.join(process.cwd(), "./public/hbsViews/login.hbs"), { nombre: req.session.email });
});


productosWebRouter.get("/home", (req, res) => {
  res.render(path.join(process.cwd(), "./public/hbsViews/home.hbs"), { nombre: req.session.email });
});



module.exports = productosWebRouter;






