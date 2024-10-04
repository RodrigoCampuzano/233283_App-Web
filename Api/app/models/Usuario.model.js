const sql = require("../config/db.config.js");


// Constructor para el modelo Usuario
const Usuario = function(usuario) {
  this.Nombre = usuario.Nombre;
  this.Contrasena = usuario.Contrasena;
};

// Método para crear un nuevo usuario
Usuario.create = (newUsuario, result) => {
  sql.query("INSERT INTO Usuario SET ?", newUsuario, (err, res) => {
    if (err) {
      console.log("Error al crear Usuario: ", err);
      result(err, null);
      return;
    }

    console.log("Usuario creado: ", { IDUsuario: res.insertId, ...newUsuario });
    result(null, { IDUsuario: res.insertId, ...newUsuario });
  });
};

// Método para obtener todos los usuarios o filtrar por nombre
Usuario.getAll = (title, result) => {
  let query = "SELECT * FROM Usuario";

  if (title) {
    query += ` WHERE Nombre LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("Error al obtener usuarios: ", err);
      result(null, err);
      return;
    }

    console.log("Usuarios obtenidos: ", res);
    result(null, res);
  });
};

// Método para encontrar un usuario por su IDUsuario
Usuario.findById = (id, result) => {
  sql.query(`SELECT * FROM Usuario WHERE IDUsuario = ${id}`, (err, res) => {
    if (err) {
      console.log("Error al encontrar Usuario: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Usuario encontrado: ", res[0]);
      result(null, res[0]);
      return;
    }
    result({ kind: "not_found" }, null);
  });
};

Usuario.updateById = (id, usuario, result) => {
  sql.query(
    "UPDATE Usuario SET Nombre = ?, Contrasena = ? WHERE ID_Usuario = ?",
    [usuario.Nombre, usuario.Contrasena, id],
    (err, res) => {
      if (err) {
        console.log("Error al actualizar Usuario: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // No se encontró el usuario con el ID especificado
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("Usuario actualizado: ", { IDUsuario: id, ...usuario });
      result(null, { IDUsuario: id, ...usuario });
    }
  );
};

Usuario.remove = (id, result) => {
  sql.query("DELETE FROM Usuario WHERE ID_Usuario = ?", id, (err, res) => {
    if (err) {
      console.log("Error al eliminar Usuario: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("Usuario eliminado con ID: ", id);
    result(null, res);
  });
};

Usuario.removeAll = result => {
  sql.query("DELETE FROM Usuario", (err, res) => {
    if (err) {
      console.log("Error al eliminar todos los usuarios: ", err);
      result(null, err);
      return;
    }

    console.log(`Eliminados ${res.affectedRows} usuarios`);
    result(null, res);
  });
};

module.exports = Usuario;

