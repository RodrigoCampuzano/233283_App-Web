import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Solicitud } from '../../models/solicitud';
import { SolicitudService } from '../../services/solicitud.service';

@Component({
  selector: 'app-solicitud-dash',
  templateUrl: './solicitud-dash.component.html',
  styleUrl: './solicitud-dash.component.css'
})
export class SolicitudDashComponent implements OnInit {

  solicitudes: Solicitud[] = [];
  showModal: boolean = false;
  selectedSolicitud: Solicitud | null = null;

  constructor(private router: Router, private solicitudService: SolicitudService){ }

  ngOnInit(): void {
    const userId = localStorage.getItem('userId'); 
    this.solicitudService.getSolicitud().subscribe(data => {
      this.solicitudes = data.filter(solicitud => solicitud.IDInvestigador === Number(userId));
    });
  }
  

  submitRecursos(){
    this.router.navigate(['Investigador/Recursos'])
  }

  submitCrearSolicitud(){
    this.router.navigate(['Investigador/CrearSolicitud'])
    
  }

  openModal(solicitud: Solicitud) {
    this.selectedSolicitud = { ...solicitud };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedSolicitud = null;
  }

  actualizarMotivo() {
    if (this.selectedSolicitud != null) {
      this.selectedSolicitud.FechaSolicitud = this.selectedSolicitud.FechaSolicitud 
        ? new Date(this.selectedSolicitud.FechaSolicitud).toISOString().split('T')[0] : '';
  
      this.solicitudService.updateSolicitud(this.selectedSolicitud.IDSolicitud, this.selectedSolicitud).subscribe(() => {
        const index = this.solicitudes.findIndex(s => s.IDSolicitud === this.selectedSolicitud!.IDSolicitud);
        if (index !== -1) {
          this.solicitudes[index].MotivoSolicitud = this.selectedSolicitud!.MotivoSolicitud;
        }
        this.closeModal();
        console.log('Motivo de la solicitud actualizado');
      });
    } 
  }
  
  

  eliminarSolicitud(solicitud: Solicitud) {
    if (confirm('¿Estás seguro de que deseas eliminar esta solicitud?')) {
      this.solicitudService.deleteSolicitudid(solicitud.IDSolicitud).subscribe(() => {
        this.solicitudes = this.solicitudes.filter(s => s.IDSolicitud !== solicitud.IDSolicitud);
        console.log('Solicitud eliminada');
      });
    }
  }

  submitCerrarSesion(){
    this.router.navigate(['/Login'])
  }

}
