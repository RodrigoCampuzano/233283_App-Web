const sql = require("../config/db.config.js");

const Usuario = function(usuario) {
  this.IDUsuario = usuario.IDUsuario;
  this.Nombre = usuario.Nombre;
  this.Apellido = usuario.Apellido;
  this.Correo = usuario.Correo;
  this.AreaEspecializacion = usuario.AreaEspecializacion;
  this.Institucion = usuario.Institucion;
  this.Rol = usuario.Rol;
  this.Contrasena = usuario.Contrasena;
};

Usuario.create = (newUsuario, result) => {
  sql.query("INSERT INTO usuario SET ?", newUsuario, (err, res) => {
    if (err) {
      console.log("Error al crear Usuario: ", err);
      result(err, null);
      return;
    }

    console.log("Usuario creado: ", { IDUsuario: res.insertId, ...newUsuario });
    result(null, { IDUsuario: res.insertId, ...newUsuario });
  });
};

Usuario.getAll = () => {
  return new Promise((resolve, reject) => {
    sql.query("SELECT * FROM usuario", (err, res) => {
      if (err) {
        console.log("Error al obtener Usuarios: ", err);
        return reject(err);
      }
      console.log("Usuarios obtenidos: ", res);
      resolve(res);
    });
  });
};


Usuario.findById = (id, result) => {
  sql.query(`SELECT IDUsuario, Nombre, Apellido, Correo, AreaEspecializacion, Institucion FROM usuario WHERE IDUsuario = ?`, [id], (err, res) => {
    if (err) {
      console.log("Error al encontrar Usuario: ", err);
      result(err, null); // Retorna el error
    }

    if (res.length) {
      console.log("Usuario encontrado: ", res[0]);
      result(null, res[0]); // Usa el callback original para retornar el usuario
      return; // Asegúrate de retornar después de enviar el resultado
    }

    // Si no se encontró el usuario
    result({ kind: "not_found" }, null);
  });
};



Usuario.updateById = (id, usuario, result) => {
  sql.query(
    "UPDATE usuario SET Nombre = ?, Apellido = ?, Correo = ?, AreaEspecializacion = ?, Institucion = ?, Rol = ? WHERE IDUsuario = ?",
    [usuario.Nombre, usuario.Apellido, usuario.Correo, usuario.AreaEspecializacion, usuario.Institucion, usuario.Rol, id],
    (err, res) => {
      if (err) {
        console.log("Error al actualizar Usuario: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("Usuario actualizado: ", { IDUsuario: id, ...usuario });
      result(null, { IDUsuario: id, ...usuario });
    }
  );
};

Usuario.remove = (id, result) => {
  sql.query("DELETE FROM usuario WHERE IDUsuario = ?", id, (err, res) => {
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
  sql.query("DELETE FROM usuario", (err, res) => {
    if (err) {
      console.log("Error al eliminar todos los Investigado: ", err);
      result(null, err);
      return;
    }

    console.log(`Eliminados ${res.affectedRows} Investigado`);
    result(null, res);
  });
};


module.exports = Usuario;

