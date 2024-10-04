const Solicitud = require("../models/Solicitud.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const solicitud = new Solicitud({
    ID_Solicitud: req.body.ID_Solicitud,
    ID_Usuario: req.body.ID_Usuario,
    ID_Recurso: req.body.ID_Recurso,
    Fecha_Solicitud: req.body.Fecha_Solicitud,
    Motivo_Solicitud: req.body.Motivo_Solicitud,
    Estado: req.body.Estado,
    Comentarios: req.body.Comentarios
  });

  Solicitud.create(solicitud, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Solicitud."
      });
    } else {
      res.send(data);
    }
  });
};

exports.findAll = (req, res) => {
  Solicitud.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Solicitud."
      });
    } else {
      res.send(data);
    }
  });
};

exports.findOne = (req, res) => {
  Solicitud.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Solicitud with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Solicitud with id " + req.params.id
        });
      }
    } else {
      res.send(data);
    }
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Solicitud.updateById(
    req.params.id, 
    new Solicitud(req.body), 
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Solicitud with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Ventas with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  Solicitud.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Solicitud with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Solicitud with id " + req.params.id
        });
      }
    } else {
      res.send({ message: `Solicitud was deleted successfully!` });
    }
  });
};
