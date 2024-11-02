import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecursoFormComponent } from './components/recurso-form/recurso-form.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    RecursoFormComponent,
  ],
  imports: [
    CommonModule,
    MatFormFieldModule, 
    MatInputModule, 
    FormsModule, 
    MatButtonModule, 
    MatIconModule,
    ReactiveFormsModule
  ],
  exports: [
    RecursoFormComponent
  ]
})
export class RecursosModule { }
