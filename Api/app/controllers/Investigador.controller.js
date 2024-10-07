const { Resolver } = require("dns");
const Investigador = require("../models/Investigador.model.js");

// Crear y guardar un nuevo Investigador
exports.create = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "El contenido no puede estar vacío."
    });
  }

  // Crear un Investigador
  const investigador = new Investigador({
    IDInvestigador: req.body.IDInvestigador,
    Nombre: req.body.Nombre,
    Apellido: req.body.Apellido,
    Correo: req.body.Correo,
    AreaEspecializacion: req.body.AreaEspecializacion,
    Institucion: req.body.Institucion,
    Rol: req.body.Rol
  });

  // Guardar Investigador en la base de datos
  Investigador.create(investigador, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Error al crear el Investigador."
      });
    else res.send(data);
  });
};

// Obtener todos los Investigadors desde la base de datos
exports.findAll = (req, res) => {
  const title = req.query.title;

  Investigador.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Error al recuperar Investigadors."
      });
    else res.send(data);
  });
};

// Encontrar un solo Investigador por su ID
exports.findOne = (req, res) => {
  Investigador.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Investigador no encontrado con el id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error al recuperar el Investigador con id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Actualizar un Investigador por su ID
exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "El contenido no puede estar vacío."
    });
  }

  Investigador.updateById(
    req.params.id,
    new Investigador(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Investigador no encontrado con id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error al actualizar Investigador con id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Eliminar un Investigador por su ID
exports.delete = (req, res) => {
  Investigador.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Investigador no encontrado con id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "No se pudo eliminar Investigador con id " + req.params.id
        });
      }
    } else res.send({ message: `Investigador eliminado exitosamente!` });
  });
};

// Eliminar todos los Investigadors de la base de datos
exports.deleteAll = (req, res) => {
  Investigador.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Error al eliminar todos los Investigadors."
      });
    else res.send({ message: `Todos los Investigadors eliminados exitosamente!` });
  });
};
