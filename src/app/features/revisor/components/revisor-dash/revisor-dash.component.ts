import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Solicitud_Recurso } from '../../models/revisor';
import { RevisorService } from '../../services/revisor.service';
import { Solicitud } from '../../models/revisor';

@Component({
  selector: 'app-revisor-dash',
  templateUrl: './revisor-dash.component.html',
  styleUrls: ['./revisor-dash.component.css'] 
})
export class RevisorDashComponent implements OnInit {

  solicitudes: Solicitud_Recurso[] = [];

  constructor(private router: Router, private solicitudService: RevisorService) { }

  ngOnInit(): void {
    const userID = localStorage.getItem('userId');
    if (userID) {
      const IDRevisor = Number(userID);
      this.solicitudService.getSolicitudesID(IDRevisor).subscribe(data => {
        this.solicitudes = data.filter(solicitud => solicitud.Estado === 'Revision');
      });
    }
  }

  submitCerrarSesion() {
    this.router.navigate(['Login']);
  }

  submitPeticiones() {
    this.router.navigate(['Revisor/Peticiones']);
  }

  denegarSolicitud(solicitud: Solicitud_Recurso) {
    const updatedSolicitud: Solicitud = {
      ...solicitud,
      Estado: 'Denegada',
      FechaSolicitud: this.formatDate(solicitud.FechaSolicitud), 
      ComentariosAdicionales: solicitud.ComentariosAdicionales 
    };

    this.solicitudService.updateSolicitud(solicitud.IDSolicitud, updatedSolicitud).subscribe(
      () => {
        solicitud.Estado = 'Denegada';
        console.log('Solicitud denegada con éxito');
      },
      error => {
        console.error('Error al denegar la solicitud', error);
      }
    );
  }
  
  aprobarSolicitud(solicitud: Solicitud_Recurso) {
    const updatedSolicitud: Solicitud = {
      ...solicitud,
      Estado: 'Aprobada',
      FechaSolicitud: this.formatDate(solicitud.FechaSolicitud),
      ComentariosAdicionales: solicitud.ComentariosAdicionales 
    };
    
    this.solicitudService.updateSolicitud(solicitud.IDSolicitud, updatedSolicitud).subscribe(
      () => {
        solicitud.Estado = 'Aprobada';
        console.log('Solicitud aprobada con éxito');
      },
      error => {
        console.error('Error al aprobar la solicitud', error);
      }
    );
  }
  
  private formatDate(date: Date | string): string {
    if (typeof date === 'string') {
      return date.split('T')[0]; 
    }
    return date.toISOString().split('T')[0]; 
  }
  
  formatTitulo(titulo: string): string {
    return titulo.replace(/[^a-z0-9]/gi, '_').toLowerCase();
  }

  guardarComentarios(solicitud: Solicitud_Recurso) {
    const updatedSolicitud: Solicitud = {
      ...solicitud,
    };

    this.solicitudService.updateSolicitud(solicitud.IDSolicitud, updatedSolicitud).subscribe(
      () => {
        console.log('Comentarios guardados exitosamente');
      },
      error => {
        console.error('Error al guardar comentarios', error);
      }
    );
  }
}
