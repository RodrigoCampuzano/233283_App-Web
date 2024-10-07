module.exports = app => {
  const Investigador = require("../controllers/Investigador.controller.js");
  const authMiddleware = require('../middleware/auth.js');
  var router = require("express").Router();

  router.post("/", Investigador.create);
  router.get("/", Investigador.findAll);
  router.get("/:id", Investigador.findOne);
  router.put("/:id", Investigador.update);
  router.delete("/:id", Investigador.delete);
  
  app.use('/api/Investigador', router);
};