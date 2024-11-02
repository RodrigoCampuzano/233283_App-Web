import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InvestigadorService } from '../../services/investigador.service';
import { Investigador } from '../../models/investigador';

@Component({
  selector: 'app-investigador-dash',
  templateUrl: './investigador-dash.component.html',
  styleUrls: ['./investigador-dash.component.css']
})
export class InvestigadorDashComponent implements OnInit {
  recursos: Investigador[] = [];

  constructor(private router: Router, private investigadorService: InvestigadorService) { }

  ngOnInit() {
    const userId = Number(localStorage.getItem('userId')); 
    if (userId) {
      this.investigadorService.getRecursosByUserId(userId).subscribe(data => {
        this.recursos = data;
      }, error => {
        console.error('Error al obtener los recursos', error);
      });
    }
  }

  submitCerrarSesion() {
    this.router.navigate(['Login']);
  }

  submitSolicitud() {
    this.router.navigate(['Investigador/Solicitudes']);
  }

  submitCrearRecursos() {
    console.log('Creacion Recurso');
    this.router.navigate(['Investigador/CrearRecurso']);
  }

  formatTitulo(titulo: string): string {
    return titulo.replace(/[^a-z0-9]/gi, '_').toLowerCase();
  }
}

