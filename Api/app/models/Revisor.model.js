const sql = require("../config/db.config.js");


const Revisor = function(revisor) {
  this.IDRevisor = revisor.IDRevisor;
  this.Nombre = revisor.Nombre;
  this.Apellido = revisor.Apellido;
  this.Correo = revisor.Correo;
  this.AreaEspecializacion = revisor.AreaEspecializacion;
  this.Institucion = revisor.Institucion;
  this.Rol = revisor.Rol;
  this.ExperienciaProfesional = revisor.ExperienciaProfesional;
};

// Método para crear un nuevo Revisor
Revisor.create = (newRevisor, result) => {
  sql.query("INSERT INTO Revisor SET ?", newRevisor, (err, res) => {
    if (err) {
      console.log("Error al crear Revisor: ", err);
      result(err, null);
      return;
    }

    console.log("Revisor creado: ", { IDRevisor: res.insertId, ...newRevisor });
    result(null, { IDRevisor: res.insertId, ...newRevisor });
  });
};

// Método para obtener todos los Revisors o filtrar por nombre
Revisor.getAll = (title, result) => {
  sql.query("SELECT * FROM Revisor", (err, res) => {
    if (err) {
      console.log("Error al obtener Revisors: ", err);
      result(null, err);
      return;
    }
    console.log("Revisors obtenidos: ", res);
    result(null, res);
  });
};

// Método para encontrar un Revisor por su IDRevisor
Revisor.findById = (id, result) => {
  sql.query(`SELECT * FROM Revisor WHERE IDRevisor = ${id}`, (err, res) => {
    if (err) {
      console.log("Error al encontrar Revisor: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Revisor encontrado: ", res[0]);
      result(null, res[0]);
      return;
    }
    result({ kind: "not_found" }, null);
  });
};

Revisor.updateById = (id, revisor, result) => {
  sql.query(
    "UPDATE Revisor SET Nombre = ?, Apellido = ?, Correo = ?, AreaEspecializacion = ?, Institucion = ?, Rol = ?, ExperienciaProfesional = ? WHERE IDRevisor = ?",
    [revisor.Nombre, revisor.Apellido, revisor.Correo, revisor.AreaEspecializacion, revisor.Institucion, revisor.Rol, revisor.ExperienciaProfesional, id],
    (err, res) => {
      if (err) {
        console.log("Error al actualizar Revisor: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // No se encontró el Revisor con el ID especificado
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("Revisor actualizado: ", { IDRevisor: id, ...Revisor });
      result(null, { IDRevisor: id, ...Revisor });
    }
  );
};

Revisor.remove = (id, result) => {
  sql.query("DELETE FROM Revisor WHERE IDRevisor = ?", id, (err, res) => {
    if (err) {
      console.log("Error al eliminar Revisor: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("Revisor eliminado con ID: ", id);
    result(null, res);
  });
};

Revisor.removeAll = result => {
  sql.query("DELETE FROM Revisor", (err, res) => {
    if (err) {
      console.log("Error al eliminar todos los Revisors: ", err);
      result(null, err);
      return;
    }

    console.log(`Eliminados ${res.affectedRows} Revisors`);
    result(null, res);
  });
};

module.exports = Revisor;

