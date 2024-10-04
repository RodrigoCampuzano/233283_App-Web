module.exports = app => {
  const Usuario = require("../controllers/Usuario.controller.js");
  const authMiddleware = require('../middleware/auth');
  var router = require("express").Router();

  router.post("/",authMiddleware.verifyToken, Usuario.create);
  router.get("/",authMiddleware.verifyToken, Usuario.findAll);
  router.get("/:id",authMiddleware.verifyToken, Usuario.findOne);
  router.put("/:id",authMiddleware.verifyToken, Usuario.update);
  router.delete("/:id",authMiddleware.verifyToken, Usuario.delete);
  router.delete("/",authMiddleware.verifyToken, Usuario.deleteAll);
  
  app.use('/api/Usuario', router);
};
