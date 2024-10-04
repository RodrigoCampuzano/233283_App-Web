const sql = require("../config/db.config.js");

// Constructor del modelo Ventas
const Solicitud = function(solicitud) {
  this.ID_Solicitud = solicitud.ID_Solicitud;
  this.ID_Usuario = solicitud.ID_Usuario;
  this.ID_Recurso = solicitud.ID_Recurso;
  this.Fecha_Solicitud = solicitud.Fecha_Solicitud;
  this.Motivo_Solicitud = solicitud.Motivo_Solicitud;
  this.Estado = solicitud.Estado;
  this.Comentarios = solicitud.Comentarios;
};

Solicitud.create = (newSolicitud, result) => {
  sql.query("INSERT INTO solicitud_recurso SET ?", newSolicitud, (err, res) => {
    if (err) {
      console.error("Error al crear la Solicitud:", err);
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...newSolicitud });
  });
};

Solicitud.getAll = result => {
  sql.query("SELECT * FROM solicitud_recurso", (err, res) => {
    if (err) {
      console.log("Error al recuperar Solicitud : ", err);
      result(null, err);
      return;
    }

    console.log("Recurso: ", res);
    result(null, res);
  });
};

Solicitud.findById = (id, result) => {
  sql.query(`SELECT * FROM solicitud_recurso WHERE ID_Solicitud = ${id}`, (err, res) => {
    if (err) {
      console.error("Error al obtener la Solicitud con ID:", id, err);
      result(err, null);
      return;
    }
    if (res.length) {
      result(null, res[0]);
      return;
    }
    result({ kind: "not_found" }, null);
  });
};

Solicitud.updateById = (id, solicitud, result) => {
  sql.query(
    "UPDATE solicitud_recurso SET ID_Solicitud = ?, ID_Usuario = ?, ID_Recurso = ?, Fecha_Solicitud = ?, Motivo_Solicitud = ?, Estado = ?, Comentraios = ? WHERE ID_Solicitud = ?",
    [solicitud.ID_Solicitud, solicitud.ID_Usuario, solicitud-ID_Recurso, solicitud.Fecha_Solicitud, solicitud.Motivo_Solicitud, solicitud.Estado, solicitud.Comentarios, id],
    (err, res) => {
      if (err) {
        console.error("Error al actualizar la Solicitud con ID:", id, err);
        result(err, null);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      result(null, { id, ...solicitud });
    }
  );
};

Solicitud.remove = (id, result) => {
  sql.query("DELETE FROM solicitud_recurso WHERE ID_Solicitud = ?", id, (err, res) => {
    if (err) {
      console.error("Error al eliminar la Solicitud con ID:", id, err);
      result(err, null);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    result(null, res);
  });
};

module.exports = Solicitud;
