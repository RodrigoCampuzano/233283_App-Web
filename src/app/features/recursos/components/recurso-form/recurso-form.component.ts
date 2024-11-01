import { Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RecursoService } from '../../services/recurso.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recurso-form',
  templateUrl: './recurso-form.component.html',
  styleUrl: './recurso-form.component.css'
})
export class RecursoFormComponent implements OnInit{
  
  recurseForm: FormGroup;

  constructor(private fb: FormBuilder, private recursoService: RecursoService, private router: Router) { 
    
    this.recurseForm = this.fb.group({
      Titulo: ['', Validators.required],
      TipoRecurso: ['', Validators.required],
      Autores: ['', Validators.required],
      FechaPublicacion: ['', Validators.required],
      Resumen: [''],
      Idioma: ['', Validators.required],
      NumeroPaginas: ['', Validators.required],
      Archivo: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  clearField(field: string) {
    this.recurseForm.get(field)?.reset();
  }

  submitBtnCacnelar(){
    this.router.navigate(['Investigador/Recursos'])
  }

  onSubmit() {
    if (this.recurseForm.valid) {
      const recursoData = this.recurseForm.value;
      this.recursoService.createRecurso(recursoData)
        .subscribe(
          response => {
            console.log('Recurso guardado con éxito', response);
          },
          error => {
            console.error('Datos del recurso:', recursoData);
            console.error('Error al guardar el recurso', error);
            
          }
        );
    } else {
      console.error('Formulario no válido', this.recurseForm.errors);
    }
  }
}
