export interface Solicitud_Recurso extends Solicitud{
    IDSolicitud: number;
	IDInvestigador: number;
	IDRecurso: number;
	IDRevisor: number;
	Titulo: string;
	MotivoSolicitud: string;
	TipoRecurso: string;
	Resumen: string;
	Idioma: string;
	NumeroPaginas: number;
	ComentariosAdicionales: string;
	Archivo: string;
	Estado: string;
}

export interface Solicitud{

    IDSolicitud: number;
	IDInvestigador: number;
	IDRecurso: number;
	IDRevisor: number;
	FechaSolicitud: string;
	MotivoSolicitud: string;
	Estado: string;
	FechaEntrega: string;
    ComentariosAdicionales: string;

}
export interface Recurso {

    IDRecurso: number;
    Titulo: string;
    TipoRecurso: string;
    Autores: string;
    FechaPublicacion: string;
    Archivo: string;
    Resumen: string;
    Idioma: string;
    NumeroPaginas: number;
    IDInvestigador: number;
    
}
  