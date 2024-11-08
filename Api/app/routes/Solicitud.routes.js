module.exports = app => {
  const solicitud = require("../controllers/Solicitud.controller.js");
  const authMiddleware = require('../middleware/auth.js');
  var router = require("express").Router();

  router.post("/", solicitud.create);
  router.get("/", solicitud.findAll);
  router.get("/:id", solicitud.findOne);
  router.put("/:id", solicitud.update);
  router.delete("/:id", solicitud.delete);
  router.get("/revisor/:idRevisor", solicitud.findByRevisorId);


  app.use('/api/Solicitud', router);
};