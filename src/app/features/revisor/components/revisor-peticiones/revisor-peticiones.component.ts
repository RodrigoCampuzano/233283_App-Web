import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Solicitud } from '../../models/revisor';
import { RevisorService } from '../../services/revisor.service';

@Component({
  selector: 'app-revisor-peticiones',
  templateUrl: './revisor-peticiones.component.html',
  styleUrls: ['./revisor-peticiones.component.css']
})
export class RevisorPeticionesComponent implements OnInit {
  solicitudes: Solicitud[] = [];
  solicitudesAprobadas: Solicitud[] = [];
  solicitudesDenegadas: Solicitud[] = [];
  solicitudesPendientes: Solicitud[] = [];
  ModalAbierta = false;
  selectedSolicitud: Solicitud | null = null;
  Titulo = '';

  constructor(private router: Router, private solicitudService: RevisorService) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userId'); 
    this.solicitudService.getSolicitud().subscribe(data => {
      this.solicitudes = data.filter(solicitud => solicitud.IDRevisor === Number(userId));
      this.solicitudesAprobadas = this.solicitudes.filter(solicitud => solicitud.Estado === 'Aprobada');
      this.solicitudesDenegadas = this.solicitudes.filter(solicitud => solicitud.Estado === 'Denegada');
      this.solicitudesPendientes = this.solicitudes.filter(solicitud => solicitud.Estado === 'Pendiente');
    });
  }

  verModal(status: string) {
    this.Titulo = status;
    this.ModalAbierta = true;
  }

  cerrarModal() {
    this.ModalAbierta = false;
    this.selectedSolicitud = null;
  }
  enviarRevision(solicitud: Solicitud) {
    if (solicitud) {
      solicitud.FechaSolicitud = solicitud.FechaSolicitud 
        ? new Date(solicitud.FechaSolicitud).toISOString().split('T')[0] 
        : '';
  
      solicitud.Estado = 'Revisión'; 

      this.solicitudService.updateSolicitud(solicitud.IDSolicitud, solicitud).subscribe(() => {
        console.log('Estado actualizado a Revisión');
        this.cerrarModal();
      });
    }
  }
  

  submitRevision() {
    this.router.navigate(['Revisor/Dashboard']);
  }

  submitCerrarSesion(){
    this.router.navigate(['Login'])
  }
}
