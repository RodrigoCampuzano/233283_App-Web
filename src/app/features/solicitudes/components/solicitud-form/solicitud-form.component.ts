import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SolicitudService } from '../../services/solicitud.service';

@Component({
  selector: 'app-solicitud-form',
  templateUrl: './solicitud-form.component.html',
  styleUrl: './solicitud-form.component.css'
})
export class SolicitudFormComponent implements OnInit{
  
  solicitudForm: FormGroup;

  constructor(private fb: FormBuilder, private solicitudService: SolicitudService) { 
    
    this.solicitudForm = this.fb.group({
      IDInvestigador: ['1', Validators.required],
      IDRecurso: ['', Validators.required],
      IDRevisor: ['1', Validators.required],
      FechaSolicitud: ['', Validators.required],
      MotivoSolicitud: ['', Validators.required],
      Estado: ['Pendiente'],
      FechaEntrega: [''],
      ComentariosAdicionales: [''],
    });
  }

  clearField(field: string) {
    this.solicitudForm.get(field)?.reset();
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.solicitudForm.valid) {
      const recursoData = this.solicitudForm.value;
  
      this.solicitudService.createSolicitud(recursoData)
        .subscribe(
          response => {
            console.log('Recurso guardado con éxito', response);
          },
          error => {
            console.log(recursoData);
            
            console.error('Error al guardar el recurso', error);
          }
        );
    } else {
      console.error('Formulario no válido', this.solicitudForm.errors);
    }
  }
}
