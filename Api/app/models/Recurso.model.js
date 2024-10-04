const sql = require("../config/db.config.js");

const Recurso = function(recurso) {
  this.ID_Recurso = recurso.ID_Recurso;
  this.Titulo = recurso.Titulo;
  this.Tipo_documento = recurso.Tipo_documento;
  this.Autores = recurso.Autores;
  this.Fecha_Publicacion = recurso.Fecha_Publicacion;
  this.Resumen = recurso.Resumen;
  this.Idioma =  recurso.Idioma;
  this.Numero_Paginas = recurso.Numero_Paginas;
  this.Archivo = recurso.Archivo;

};

Recurso.create = (newRecurso, result) => {
  sql.query("INSERT INTO recurso SET ?", newRecurso, (err, res) => {
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
  sql.query(`SELECT * FROM recurso WHERE ID_Recurso = ${id}`, (err, res) => {
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
    "UPDATE recurso SET Titulo = ?, Tipo_documento = ?, Autores = ?, Fecha_Publicacion = ?, Resumen = ?, Idioma = ?, Numero_Paginas = ?, Archivo = ? WHERE ID_Recurso = ?",
    [recurso.Titulo, recurso.Tipo_documento, recurso.Autores, recurso.Fecha_Publicacion, recurso.Resumen, recurso.Idioma, recurso.Numero_Paginas, recurso.Archivo, id],
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
  sql.query("DELETE FROM recurso WHERE ID_Recurso = ?", id, (err, res) => {
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
