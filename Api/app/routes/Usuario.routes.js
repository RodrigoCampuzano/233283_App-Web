module.exports = app => {
  const Usuario = require("../controllers/Usuario.controller.js");
  var router = require("express").Router();
  const verifyToken = require('../middleware/auth.js')

  router.post("/register", Usuario.register);
  router.post("/login", Usuario.login);
  router.get("/obtener", Usuario.finAll);

  app.use('/api/Usuario', router);
};