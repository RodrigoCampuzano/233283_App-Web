import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SolicitudService } from '../../services/solicitud.service';
import { Router } from '@angular/router';
import { Recurso } from '../../models/recurso';
import { Revisor } from '../../models/revisor';
import { Solicitud } from '../../models/solicitud';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-solicitud-form',
  templateUrl: './solicitud-form.component.html',
  styleUrls: ['./solicitud-form.component.css']
})
export class SolicitudFormComponent implements OnInit {
  
  solicitudForm: FormGroup;
  recursos: Recurso[] = []; 
  revisores: Revisor[] = []; 

  constructor(private fb: FormBuilder, private recursoService: SolicitudService, private router: Router) {
    this.solicitudForm = this.fb.group({
      IDInvestigador: ['', Validators.required],
      IDRecurso: ['', Validators.required],
      IDRevisor: ['', Validators.required],
      FechaSolicitud: ['', Validators.required],
      MotivoSolicitud: ['', Validators.required],
      Estado: ['Pendiente'],
    });
  }

  ngOnInit() {
    this.loadRecursos();
    this.loadRevisores();
  
    const idInvestigador = localStorage.getItem('userId'); 
    if (idInvestigador) {
      this.solicitudForm.patchValue({ IDInvestigador: idInvestigador });
    }
  }
  
  loadRecursos() {
    const idInvestigador = Number(localStorage.getItem('userId')); 
    this.recursoService.getRecursos().subscribe(
      (data: Recurso[]) => {
        this.recursos = data.filter(recurso => recurso.IDInvestigador === idInvestigador);
      },
      (error: HttpErrorResponse) => {
        console.error('Error al cargar recursos:', error);
      }
    );
  }
  
  loadRevisores() {
    this.recursoService.getRevisores().subscribe(
      (data: Revisor[]) => {
        console.log('Revisores cargados:', data);
        this.revisores = data.filter(revisor => revisor.rol === 1);
      },
      (error: HttpErrorResponse) => {
        console.error('Error al cargar revisores:', error);
        if (error.status === 404) {
          alert('No se encontraron revisores.');
        } else {
          alert('Ocurrió un error al cargar revisores: ' + error.message);
        }
      }
    );
  }
  
  submitBtnCancel() {
    this.router.navigate(['Investigador/Solicitudes']);
  }

  onSubmit() {
    if (this.solicitudForm.valid) {
      const solicitudData: Solicitud = this.solicitudForm.value;
      if (solicitudData.FechaSolicitud) {
        const fecha = new Date(solicitudData.FechaSolicitud);
        if (!isNaN(fecha.getTime())) {
          solicitudData.FechaSolicitud = fecha.toISOString().slice(0, 10);
        } else {
          console.error('Fecha no válida:', solicitudData.FechaSolicitud);
          alert('Por favor, selecciona una fecha válida.');
          return; 
        }
      } else {
        console.error('Fecha de solicitud no proporcionada');
        alert('Por favor selecciona una fecha de solicitud.');
        return;
      }
  
      this.recursoService.createSolicitud(solicitudData).subscribe(
        response => {
          console.log('Solicitud guardada con éxito', response);
          this.router.navigate(['Investigador/Solicitudes']);
        },
        error => {
          console.error('Error al guardar la solicitud', error);
          alert('Ocurrió un error al guardar la solicitud. Intenta de nuevo.');
        }
      );
    } else {
      console.error('Formulario no válido', this.solicitudForm.errors);
      alert('Por favor completa todos los campos requeridos.');
    }  
  }
  
}
