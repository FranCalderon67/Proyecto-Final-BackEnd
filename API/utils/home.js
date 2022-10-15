const { Router } = require("express");

// const path = require("path");
const productosWebRouter = Router();

productosWebRouter.get("/", (req, res) => {
  res.redirect("/", { nombre: req.session.email });
});

module.exports = productosWebRouter;
