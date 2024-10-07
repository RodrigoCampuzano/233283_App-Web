const Revisor = require("../models/Revisor.model.js");

// Crear y guardar un nuevo Revisor
exports.create = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "El contenido no puede estar vacío."
    });
  }

  // Crear un Revisor
  const revisor = new Revisor({
    IDRevisor:  req.body.IDRevisor,
    Nombre: req.body.Nombre,
    Apellido: req.body.Apellido,
    Correo: req.body.Correo,
    AreaEspecializacion: req.body.AreaEspecializacion,
    Institucion: req.body.Institucion,
    Rol: req.body.Rol,
    ExperienciaProfesional: req.body.ExperienciaProfesional
  });

  // Guardar Revisor en la base de datos
  Revisor.create(revisor, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Error al crear el Revisor."
      });
    else res.send(data);
  });
};

// Obtener todos los Revisors desde la base de datos
exports.findAll = (req, res) => {
  const title = req.query.title;

  Revisor.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Error al recuperar Revisors."
      });
    else res.send(data);
  });
};

// Encontrar un solo Revisor por su ID
exports.findOne = (req, res) => {
  Revisor.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Revisor no encontrado con el id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error al recuperar el Revisor con id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Actualizar un Revisor por su ID
exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "El contenido no puede estar vacío."
    });
  }

  Revisor.updateById(
    req.params.id,
    new Revisor(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Revisor no encontrado con id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error al actualizar Revisor con id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Eliminar un Revisor por su ID
exports.delete = (req, res) => {
  Revisor.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Revisor no encontrado con id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "No se pudo eliminar Revisor con id " + req.params.id
        });
      }
    } else res.send({ message: `Revisor eliminado exitosamente!` });
  });
};

// Eliminar todos los Revisors de la base de datos
exports.deleteAll = (req, res) => {
  Revisor.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Error al eliminar todos los Revisors."
      });
    else res.send({ message: `Todos los Revisors eliminados exitosamente!` });
  });
};
