import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-revisor-peticiones',
  templateUrl: './revisor-peticiones.component.html',
  styleUrl: './revisor-peticiones.component.css'
})
export class RevisorPeticionesComponent {

  constructor(private router: Router){}

  ModalAbierta = false;
  Titulo = '';

  verModal(status: string) {
    this.Titulo = status;
    this.ModalAbierta = true;
  }

  cerrarModal() {
    this.ModalAbierta = false;
  }

  submitRevision(){
    this.router.navigate(['Revisor/Dashboard'])
  }
}
