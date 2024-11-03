const sql = require("../config/db.config.js");

// Constructor del modelo Ventas
const Solicitud = function(solicitud) {
  this.IDSolicitud = solicitud.IDSolicitud;
  this.IDInvestigador = solicitud.IDInvestigador || null;
  this.IDRecurso = solicitud.IDRecurso || null;
  this.IDRevisor = solicitud.IDRevisor || null;
  this.FechaSolicitud = solicitud.FechaSolicitud;
  this.MotivoSolicitud = solicitud.MotivoSolicitud;
  this.Estado = solicitud.Estado;
  this.FechaEntrega = solicitud.FechaEntrega || null;
  this.ComentariosAdicionales = solicitud.ComentariosAdicionales || null;
};



Solicitud.create = (newSolicitud, result) => {
  sql.query("INSERT INTO Solicitud SET ?", newSolicitud, (err, res) => {
    if (err) {
      console.error("Error al crear la Solicitud:", err);
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...newSolicitud });
  });
};

Solicitud.getAll = result => {
  sql.query("SELECT * FROM Solicitud", (err, res) => {
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
  sql.query(`SELECT * FROM Solicitud WHERE IDSolicitud = ${id}`, (err, res) => {
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
    "UPDATE Solicitud SET IDInvestigador = ?, IDRecurso = ?, IDRevisor = ?, FechaSolicitud = ?, MotivoSolicitud = ?, Estado = ?, FechaEntrega = ?, ComentariosAdicionales = ? WHERE IDSolicitud = ?",
    [solicitud.IDInvestigador, solicitud.IDRecurso, solicitud.IDRevisor, solicitud.FechaSolicitud, solicitud.MotivoSolicitud, solicitud.Estado, solicitud.FechaEntrega, solicitud.ComentariosAdicionales, id],
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
  sql.query("DELETE FROM Solicitud WHERE IDSolicitud = ?", id, (err, res) => {
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

Solicitud.findByRevisorId = (idRevisor, result) => {
  const query = `
    SELECT 
      Solicitud.IDSolicitud,
      Solicitud.IDInvestigador,
      Solicitud.IDRecurso,
      Solicitud.IDRevisor,
      Solicitud.FechaSolicitud,
      Solicitud.MotivoSolicitud,
      Solicitud.Estado,
      Solicitud.FechaEntrega,
      Solicitud.ComentariosAdicionales,
      Recurso.Titulo,
      Recurso.TipoRecurso,
      Recurso.Autores,
      Recurso.FechaPublicacion,
      Recurso.Archivo,
      Recurso.Resumen,
      Recurso.Idioma,
      Recurso.NumeroPaginas
    FROM 
      Solicitud
    LEFT JOIN 
      Recurso ON Solicitud.IDRecurso = Recurso.IDRecurso
    WHERE 
      Solicitud.IDRevisor = ?
  `;

  sql.query(query, [idRevisor], (err, res) => {
    if (err) {
      console.error("Error al obtener solicitudes por IDRevisor:", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};


module.exports = Solicitud;
