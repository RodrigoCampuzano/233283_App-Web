module.exports = app => {
  const recurso = require("../controllers/Recurso.controller.js");
  const authMiddleware = require('../middleware/auth.js');
  var router = require("express").Router();

  router.post("/", recurso.create);
  router.get("/", recurso.findAll);
  router.get("/:id", recurso.findOne);
  router.put("/:id", recurso.update);
  router.delete("/:id", recurso.delete);
  
  app.use('/api/Recurso', router);
};
