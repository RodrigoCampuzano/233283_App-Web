const Solicitud = require("../models/Solicitud.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const solicitud = new Solicitud({
    IDSolicitud: req.body.IDSolicitud,
    IDInvestigador: req.body.IDInvestigador,
    IDRecurso: req.body.IDRecurso,
    IDRevisor: req.body.IDRevisor,
    FechaSolicitud: req.body.FechaSolicitud,
    MotivoSolicitud: req.body.MotivoSolicitud,
    Estado: req.body.Estado,
    FechaEntrega: req.body.FechaEntrega,
    ComentariosAdicionales: req.body.ComentariosAdicionales
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

exports.findByRevisorId = (req, res) => {
  const idRevisor = req.params.idRevisor;

  Solicitud.findByRevisorId(idRevisor, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Error al recuperar las solicitudes por IDRevisor."
      });
    } else {
      res.send(data);
    }
  });
};
