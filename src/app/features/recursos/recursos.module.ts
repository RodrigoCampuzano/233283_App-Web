import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecursoListComponent } from './components/recurso-list/recurso-list.component';
import { RecursoFormComponent } from './components/recurso-form/recurso-form.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { RecursosDashComponent } from './components/recursos-dash/recursos-dash.component';



@NgModule({
  declarations: [
    RecursoListComponent,
    RecursoFormComponent,
    RecursosDashComponent
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
    RecursoFormComponent,
    RecursoListComponent,
    RecursosDashComponent
  ]
})
export class RecursosModule { }
