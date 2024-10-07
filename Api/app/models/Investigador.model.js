const sql = require("../config/db.config.js");

const Investigador = function(investigador) {
  this.IDInvestigador = investigador.IDInvestigador;
  this.Nombre = investigador.Nombre;
  this.Apellido = investigador.Apellido;
  this.Correo = investigador.Correo;
  this.AreaEspecializacion = investigador.AreaEspecializacion;
  this.Institucion = investigador.Institucion;
  this.Rol = investigador.Rol;
};

// Método para crear un nuevo Investigador
Investigador.create = (newInvestigador, result) => {
  sql.query("INSERT INTO Investigador SET ?", newInvestigador, (err, res) => {
    if (err) {
      console.log("Error al crear Investigador: ", err);
      result(err, null);
      return;
    }

    console.log("Investigador creado: ", { IDInvestigador: res.insertId, ...newInvestigador });
    result(null, { IDInvestigador: res.insertId, ...newInvestigador });
  });
};

// Método para obtener todos los Investigadors o filtrar por nombre
Investigador.getAll = (title, result) => {
  sql.query("SELECT * FROM Investigador", (err, res) => {
    if (err) {
      console.log("Error al obtener Investigadors: ", err);
      result(null, err);
      return;
    }
    console.log("Investigadors obtenidos: ", res);
    result(null, res);
  });
};

// Método para encontrar un Investigador por su IDInvestigador
Investigador.findById = (id, result) => {
  sql.query(`SELECT * FROM Investigador WHERE IDInvestigador = ${id}`, (err, res) => {
    if (err) {
      console.log("Error al encontrar Investigador: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Investigador encontrado: ", res[0]);
      result(null, res[0]);
      return;
    }
    result({ kind: "not_found" }, null);
  });
};

Investigador.updateById = (id, investigador, result) => {
  sql.query(
    "UPDATE Investigador SET Nombre = ?, Apellido = ?, Correo = ?, AreaEspecializacion = ?, Institucion = ?, Rol = ? WHERE IDInvestigador = ?",
    [investigador.Nombre, investigador.Apellido, investigador.Correo, investigador.AreaEspecializacion, investigador.Institucion, investigador.Rol, id],
    (err, res) => {
      if (err) {
        console.log("Error al actualizar Investigador: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // No se encontró el Investigador con el ID especificado
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("Investigador actualizado: ", { IDInvestigador: id, ...Investigador });
      result(null, { IDInvestigador: id, ...Investigador });
    }
  );
};

Investigador.remove = (id, result) => {
  sql.query("DELETE FROM Investigador WHERE IDInvestigador = ?", id, (err, res) => {
    if (err) {
      console.log("Error al eliminar Investigador: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("Investigador eliminado con ID: ", id);
    result(null, res);
  });
};

Investigador.removeAll = result => {
  sql.query("DELETE FROM Investigador", (err, res) => {
    if (err) {
      console.log("Error al eliminar todos los Investigado: ", err);
      result(null, err);
      return;
    }

    console.log(`Eliminados ${res.affectedRows} Investigado`);
    result(null, res);
  });
};

module.exports = Investigador;

