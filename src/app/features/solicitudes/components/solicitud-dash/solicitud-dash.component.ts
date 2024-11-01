import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-solicitud-dash',
  templateUrl: './solicitud-dash.component.html',
  styleUrl: './solicitud-dash.component.css'
})
export class SolicitudDashComponent {

  constructor(private router: Router){

  }

  submitRecursos(){
    this.router.navigate(['Investigador/Recursos'])
  }

  submitCrearSolicitud(){
    this.router.navigate(['Investigador/CrearSolicitud'])
    
  }

}
