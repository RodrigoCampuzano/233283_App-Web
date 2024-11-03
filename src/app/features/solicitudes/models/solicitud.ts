export interface Solicitud {
    
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
