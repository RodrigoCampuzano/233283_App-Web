import { Component, OnInit } from '@angular/core';
import { Solicitud } from '../../models/solicitud';
import { SolicitudService } from '../../services/solicitud.service';

@Component({
  selector: 'app-solicitud-list',
  templateUrl: './solicitud-list.component.html',
  styleUrl: './solicitud-list.component.css'
})
export class SolicitudListComponent implements OnInit {
  solicitud: Solicitud [] = [];
  solicitudSeleccionado: Solicitud | null = null; 

  constructor(private solicitudService: SolicitudService){}

  ngOnInit(): void {
    this.cargarSolicitudes();
  }

  cargarSolicitudes() {
    this.solicitudService.getSolicitud().subscribe(
      (data) => {
        this.solicitud = data;
        this.solicitud.forEach(solicitud => {
          solicitud.FechaSolicitud = new Date(solicitud.FechaSolicitud).toISOString().split('T')[0]; // 'YYYY-MM-DD'
        });
      },
      (error) => {
        console.error('Error al cargar recursos', error);
      }
    );
  }  
  

  editarSolicitudes(solicitud: Solicitud) {
    this.solicitudSeleccionado = { ...solicitud };
  }
  
  eliminarSolicitudes(id: number) {
    this.solicitudService.deleteSilicitudid(id).subscribe(
      () => {
        this.cargarSolicitudes();
      },
      (error) => {
        console.error('Error al eliminar el recurso', error);
      }
    );
  }

  actualizarSolicitudes() {
    if (this.solicitudSeleccionado) {
      this.solicitudSeleccionado.FechaSolicitud = new Date(this.solicitudSeleccionado.FechaSolicitud).toISOString().split('T')[0];
      console.log("Datos a actualizar:", this.solicitudSeleccionado);
      this.solicitudService.updateSolicitud(this.solicitudSeleccionado.IDSolicitud, this.solicitudSeleccionado)
        .subscribe(
          () => {
            this.cargarSolicitudes();
            this.solicitudSeleccionado = null;
          },
          (error) => {
            console.error('Error al actualizar el recurso', error);
          }
        );
    }
  }
  
  
}
