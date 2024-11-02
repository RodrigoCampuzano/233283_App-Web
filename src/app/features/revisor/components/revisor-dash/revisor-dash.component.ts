import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-revisor-dash',
  templateUrl: './revisor-dash.component.html',
  styleUrl: './revisor-dash.component.css'
})
export class RevisorDashComponent {

  valor_button=false;

  constructor(private router: Router){

  }

  submitCerrarSesion(){
    this.router.navigate(['Login'])
  }

  submitVerBtn(){
    this.valor_button = !this.valor_button;
  }

  submitPeticiones(){
    this.router.navigate(['Revisor/Peticiones'])
  }
}
