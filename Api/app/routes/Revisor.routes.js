module.exports = app => {
  const Revisor = require("../controllers/Revisor.controller.js");
  const authMiddleware = require('../middleware/auth.js');
  var router = require("express").Router();

  router.post("/", Revisor.create);
  router.get("/", Revisor.findAll);
  router.get("/:id", Revisor.findOne);
  router.put("/:id", Revisor.update);
  router.delete("/:id", Revisor.delete);
  
  app.use('/api/Revisor', router);
};
