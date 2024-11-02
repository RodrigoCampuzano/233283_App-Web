module.exports = app => {
  const recurso = require("../controllers/Recurso.controller.js");
  const authMiddleware = require('../middleware/auth.js');
  var router = require("express").Router();
  const multer = require("multer");
  const path = require("path");

  const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
  });

  const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
      const filetypes = /pdf/;
      const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = filetypes.test(file.mimetype);
  
      if (mimetype && extname) {
        return cb(null, true);
      }
      cb("Error: El archivo debe ser un PDF.");
    }
  });

  router.post("/", upload.single("archivo"), recurso.create);
  router.get("/", recurso.findAll);
  router.get("/:id", recurso.findOne);
  router.put("/:id", recurso.update);
  router.delete("/:id", recurso.delete);
  
  app.use('/api/Recurso', router);
};
