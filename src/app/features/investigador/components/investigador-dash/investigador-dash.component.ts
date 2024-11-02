import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InvestigadorService } from '../../services/investigador.service';
import { Investigador } from '../../models/investigador';

@Component({
  selector: 'app-investigador-dash',
  templateUrl: './investigador-dash.component.html',
  styleUrls: ['./investigador-dash.component.css']
})
export class InvestigadorDashComponent implements OnInit {
  verModal: boolean = false;
  recursos: Investigador[] = [];
  selectedInvestigador: Investigador | null = null;
  recursoForm: FormGroup;

  constructor(private router: Router, private investigadorService: InvestigadorService, private fb: FormBuilder) {
    this.recursoForm = this.fb.group({
      Titulo: [''],
      TipoRecurso: [''],
      Autores: [''],
      FechaPublicacion: [''],
      Resumen: [''],
      Idioma: [''],
      NumeroPaginas: [''],
      archivo: [null]
    });
  }

  ngOnInit() {
    const userId = Number(localStorage.getItem('userId')); 
    this.investigadorService.getRecursosByUserId(userId).subscribe(data => {
      this.recursos = data.filter(recurso => recurso.IDInvestigador === userId);
    });
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

  eliminarRecurso(recurso: Investigador) {
    if (confirm('¿Estás seguro de que deseas eliminar esta solicitud?')) {
      this.investigadorService.deleteRecursoId(recurso.IDRecurso).subscribe(() => {
        this.recursos = this.recursos.filter(s => s.IDRecurso !== recurso.IDRecurso);
        console.log('Solicitud eliminada');
      });
    }
  }
  modificarRecurso() { 
    if (this.selectedInvestigador) {
      const fechaPublicacion = this.selectedInvestigador.FechaPublicacion 
        ? new Date(this.selectedInvestigador.FechaPublicacion).toISOString().split('T')[0] 
        : '';
  
      const updatedRecurso = {
        ...this.selectedInvestigador,
        ...this.recursoForm.value,
        FechaPublicacion: fechaPublicacion
      };
  
      this.investigadorService.updateSolicitud(this.selectedInvestigador.IDRecurso, updatedRecurso).subscribe(() => {
        const index = this.recursos.findIndex(s => s.IDRecurso === this.selectedInvestigador!.IDRecurso);
        if (index !== -1) {
          this.recursos[index] = updatedRecurso;
        }
        this.cerrarModal(); 
      });
    }
  }
  

  opneModal(recurso: Investigador) {
    this.selectedInvestigador = { ...recurso };
    this.recursoForm.patchValue(this.selectedInvestigador); 
    this.verModal = true;
  }

  cerrarModal() {
    this.verModal = false;
    this.selectedInvestigador = null;
    this.recursoForm.reset();
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      this.recursoForm.patchValue({ archivo: target.files[0] });
    }
  }
}
