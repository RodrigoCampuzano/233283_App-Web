const { Resolver } = require("dns");
const db = require('../config/db.config.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const Usuario = require("../models/Usuario.model.js");
dotenv.config()

exports.register = async (req, res) => {
  try {
    const { Nombre, Apellido, Correo, AreaEspecializacion, Institucion, Rol, Contrasena } = req.body;
    if (!Contrasena) {
      return res.status(400).send({ message: "La contraseña es requerida." });
    }
    
    const hashedContrasena = bcrypt.hashSync(Contrasena, 8);

    // Envuelve db.query en una promesa
    const query = 'INSERT INTO usuario (Nombre, Apellido, Correo, AreaEspecializacion, Institucion, Rol, Contrasena) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const result = await new Promise((resolve, reject) => {
      db.query(query, [Nombre, Apellido, Correo, AreaEspecializacion, Institucion, Rol, hashedContrasena], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });

    res.status(201).send({ id: result.insertId, Nombre, Apellido, Correo, AreaEspecializacion, Institucion, Rol });
  } catch (err) {
    console.error("Error al insertar usuario:", err);
    res.status(500).send({ message: "Error al registrar usuario.", error: err });
  }
};


exports.login = (req, res) => {
  const { Correo, Contrasena } = req.body;

  const query = 'SELECT * FROM usuario WHERE Correo = ?';
  db.query(query, [Correo], (err, results) => {
    if (err) return res.status(500).send({ message: 'Error en el servidor' });
    if (results.length === 0) return res.status(401).send({ message: 'Credenciales incorrectas' });

    const user = results[0];
    const passwordIsValid = bcrypt.compareSync(Contrasena, user.Contrasena);
    if (!passwordIsValid) return res.status(401).send({ token: null, message: 'Credenciales incorrectas' });

    const token = jwt.sign({ id: user.IDUsuario, rol: user.Rol }, process.env.JWT_SECRET, { expiresIn: 86400 });
    res.status(200).send({ id: user.IDUsuario, nombre: user.Nombre, correo: user.Correo, rol: user.Rol, token });
  });
};  

exports.finAll = async (req, res) => {
  try {
    const data = await Usuario.getAll();
    const usuariosFiltrados = data.map(usuario => ({
      id: usuario.IDUsuario,
      nombre: usuario.Nombre,
      rol: usuario.Rol
    }));

    res.send(usuariosFiltrados);
  } catch (err) {
    console.error("Error al obtener usuarios:", err);
    res.status(500).send({
      message: err.message || "Error al recuperar usuarios."
    });
  }
};






/*


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
*/