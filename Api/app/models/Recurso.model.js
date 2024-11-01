const sql = require("../config/db.config.js");

const Recurso = function(recurso) {
  this.IDRecurso = recurso.IDRecurso;
  this.Titulo = recurso.Titulo;
  this.TipoRecurso = recurso.TipoRecurso;
  this.Autores = recurso.Autores;
  this.FechaPublicacion = recurso.FechaPublicacion;
  this.Archivo = recurso.Archivo;
  this.Resumen = recurso.Resumen;
  this.Idioma =  recurso.Idioma;
  this.NumeroPaginas = recurso.NumeroPaginas;
  this.IDInvestigador = recurso.IDInvestigador;
};

Recurso.create = (newRecurso, result) => {
  sql.query("INSERT INTO Recurso SET ?", newRecurso, (err, res) => {
    if (err) {
      console.log("Error al crear Recurso: ", err);
      result(err, null);
      return;
    }
    console.log("Recurso creado: ", { id: res.insertId, ...newRecurso });
    result(null, { id: res.insertId, ...newRecurso });
  });
};

Recurso.findById = (id, result) => {
  sql.query(`SELECT * FROM Recurso WHERE IDRecurso = ${id}`, (err, res) => {
    if (err) {
      console.log("Error al buscar Recurso: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Recurso encontrado: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Recurso.getAll = result => {
  sql.query("SELECT * FROM Recurso", (err, res) => {
    if (err) {
      console.log("Error al recuperar Recurso: ", err);
      result(null, err);
      return;
    }

    console.log("Recurso: ", res);
    result(null, res);
  });
};

Recurso.updateById = (id, recurso, result) => {
  sql.query(
    "UPDATE Recurso SET Titulo = ?, TipoRecurso = ?, Autores = ?, FechaPublicacion = ?, Archivo = ?, Resumen = ?, Idioma = ?, NumeroPaginas = ?, IDInvestigador = ? WHERE IDRecurso = ?",
    [recurso.Titulo, recurso.TipoRecurso, recurso.Autores, recurso.FechaPublicacion, recurso.Archivo, recurso.Resumen, recurso.Idioma, recurso.NumeroPaginas, recurso.IDInvestigador, id],
    (err, res) => {
      if (err) {
        console.log("Error al actualizar Recurso: ", err);
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("Recurso actualizado: ", { id: id, ...recurso });
      result(null, { id: id, ...recurso });
    }
  );
};


Recurso.remove = (id, result) => {
  sql.query("DELETE FROM Recurso WHERE IDRecurso = ?", id, (err, res) => {
    if (err) {
      console.log("Error al eliminar Recurso: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("Recurso eliminado con ID: ", id);
    result(null, res);
  });
};

module.exports = Recurso;
