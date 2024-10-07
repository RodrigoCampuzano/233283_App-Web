import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RecursoService } from '../../services/recurso.service';   

@Component({
  selector: 'app-recurso-form',
  templateUrl: './recurso-form.component.html',
  styleUrl: './recurso-form.component.css'
})
export class RecursoFormComponent implements OnInit {
  
  recurseForm: FormGroup;

  constructor(private fb: FormBuilder, private recursoService: RecursoService) { 
    
    this.recurseForm = this.fb.group({
      Titulo: ['', Validators.required],
      Tipo_documento: ['', Validators.required],
      Autores: ['', Validators.required],
      Fecha_Publicacion: ['', Validators.required],
      Resumen: [''],
      Idioma: ['', Validators.required],
      Numero_Paginas: ['', Validators.required],
      Archivo: ['', Validators.required],
    });
  }

  clearField(field: string) {
    this.recurseForm.get(field)?.reset();
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.recurseForm.valid) {
      const recursoData = this.recurseForm.value;
  
      this.recursoService.createRecurso(recursoData)
        .subscribe(
          response => {
            console.log('Recurso guardado con éxito', response);
          },
          error => {
            console.error('Error al guardar el recurso', error);
          }
        );
    } else {
      console.error('Formulario no válido', this.recurseForm.errors);
    }
  }
}
