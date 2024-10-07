export interface Solicitud {
    IDSolicitud: number;
	IDInvestigador: number;
	IDRecurso: number;
	IDRevisor: number;
	FechaSolicitud: Date | string;
	MotivoSolicitud: string;
	Estado: string | null;
	FechaEntrega: Date | null
    ComentariosAdicionales: string | null;
}
