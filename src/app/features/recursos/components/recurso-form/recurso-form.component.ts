import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RecursoService } from '../../services/recurso.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recurso-form',
  templateUrl: './recurso-form.component.html',
  styleUrls: ['./recurso-form.component.css']
})
export class RecursoFormComponent implements OnInit {


  recurseForm: FormGroup;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private recursoService: RecursoService, private router: Router) {
    this.recurseForm = this.fb.group({
      Titulo: ['', Validators.required],
      TipoRecurso: ['', Validators.required],
      Autores: ['', Validators.required],
      FechaPublicacion: ['', Validators.required],
      Resumen: [''],
      Idioma: ['', Validators.required],
      NumeroPaginas: ['', Validators.required],
      archivo: ['', Validators.required],
      IDInvestigador: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const idInvestigador = localStorage.getItem('userId'); // Cambia `IDUsuario` por `userId` si es el nombre correcto en `localStorage`
    if (idInvestigador) {
      this.recurseForm.get('IDInvestigador')?.setValue(idInvestigador);
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit() {
    if (this.recurseForm.valid) {
      const recursoData = new FormData();

      // Agrega todos los campos excepto el archivo
      Object.keys(this.recurseForm.controls).forEach(key => {
        if (key !== 'archivo') {
          recursoData.append(key, this.recurseForm.get(key)?.value);
        }
      });

      // Agrega el archivo
      if (this.selectedFile) {
        recursoData.append('archivo', this.selectedFile, this.selectedFile.name);
      }

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
    
  clearField(field: string) {
    this.recurseForm.get(field)?.reset();
  }

  submitBtnCacnelar(){
    this.router.navigate(['Investigador/Recursos']);
  }
  
}
