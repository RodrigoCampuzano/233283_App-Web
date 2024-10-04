const Usuario = require("../models/Usuario.model.js");

// Crear y guardar un nuevo usuario
exports.create = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "El contenido no puede estar vacío."
    });
  }

  // Crear un usuario
  const usuario = new Usuario({
    Nombre: req.body.Nombre,
    Contrasena: req.body.Contrasena,
  });

  // Guardar usuario en la base de datos
  Usuario.create(usuario, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Error al crear el Usuario."
      });
    else res.send(data);
  });
};

// Obtener todos los usuarios desde la base de datos
exports.findAll = (req, res) => {
  const title = req.query.title;

  Usuario.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Error al recuperar usuarios."
      });
    else res.send(data);
  });
};

// Encontrar un solo usuario por su ID
exports.findOne = (req, res) => {
  Usuario.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Usuario no encontrado con el id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error al recuperar el Usuario con id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Actualizar un usuario por su ID
exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "El contenido no puede estar vacío."
    });
  }

  Usuario.updateById(
    req.params.id,
    new Usuario(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Usuario no encontrado con id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error al actualizar Usuario con id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Eliminar un usuario por su ID
exports.delete = (req, res) => {
  Usuario.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Usuario no encontrado con id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "No se pudo eliminar Usuario con id " + req.params.id
        });
      }
    } else res.send({ message: `Usuario eliminado exitosamente!` });
  });
};

// Eliminar todos los usuarios de la base de datos
exports.deleteAll = (req, res) => {
  Usuario.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Error al eliminar todos los Usuarios."
      });
    else res.send({ message: `Todos los Usuarios eliminados exitosamente!` });
  });
};
