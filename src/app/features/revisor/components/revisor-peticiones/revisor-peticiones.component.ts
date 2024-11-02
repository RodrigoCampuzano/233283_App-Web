import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-revisor-peticiones',
  templateUrl: './revisor-peticiones.component.html',
  styleUrls: ['./revisor-peticiones.component.css']
})
export class RevisorPeticionesComponent {
  
  ModalAprovada = false;
  ModalDenegada = false;
  ModalPendiente = false;

  constructor(private router: Router) {}

  verModalAprovada() { this.ModalAprovada = true; }
  verModalDenegada() { this.ModalDenegada = true; }
  verModalPendiente() { this.ModalPendiente = true; }

  cerrarModalAprovada() {
    console.log("Cerrando modal aprobada"); // Añadir un console log para verificar
    this.ModalAprovada = false; 
  }
  
  cerrarModalDenegada() {
    console.log("Cerrando modal denegada"); // Añadir un console log para verificar
    this.ModalDenegada = false; 
  }
  
  cerrarModalPendiente() {
    console.log("Cerrando modal pendiente"); // Añadir un console log para verificar
    this.ModalPendiente = false; 
  }

  submitRevision() {
    this.router.navigate(['Revisor/Dashboard']);
  }

  cargarRecursos() {
    // Implementar la lógica para cargar recursos
  }
}
