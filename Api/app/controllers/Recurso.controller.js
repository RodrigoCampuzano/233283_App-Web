const Recurso = require("../models/Recurso.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "El contenido no puede estar vacío."
    });
    return;
  }

  const recurso = new Recurso({
    ID_Recurso: req.body.ID_Recurso,
    Titulo: req.body.Titulo,
    Tipo_documento: req.body.Tipo_documento,
    Autores: req.body.Autores,
    Fecha_Publicacion: req.body.Fecha_Publicacion,
    Resumen: req.body.Resumen,
    Idioma:  req.body.Idioma,
    Numero_Paginas: req.body.Numero_Paginas,
    Archivo: req.body.Archivo,
  });

  Recurso.create(recurso, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Error al crear el Recurso."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  Recurso.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Error al recuperar los Recurso."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Recurso.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Recurso no encontrado con ID ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error al recuperar el Recurso con ID " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "El contenido no puede estar vacío."
    });
  }

  Recurso.updateById(
    req.params.id,
    new Recurso(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Recurso no encontrado con ID ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error al actualizar el Recurso con ID " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  Recurso.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Recurso no encontrado con ID ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "No se pudo eliminar el Recurso con ID " + req.params.id
        });
      }
    } else res.send({ message: `Recurso eliminado exitosamente!` });
  });
};
