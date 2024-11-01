import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recursos-dash',
  templateUrl: './recursos-dash.component.html',
  styleUrl: './recursos-dash.component.css'
})
export class RecursosDashComponent {

  constructor(private router: Router){

  }

  submitSolicitud(){
    this.router.navigate(['Investigador/Solicitudes'])
  }

  submitCrearRecursos(){
  console.log('Creacion Recurso');
  this.router.navigate(['Investigador/CrearRecurso'])
  }
}
