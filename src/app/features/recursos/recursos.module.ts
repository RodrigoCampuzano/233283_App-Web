import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecursoListComponent } from './components/recurso-list/recurso-list.component';
import { RecursoFormComponent } from './components/recurso-form/recurso-form.component';



@NgModule({
  declarations: [
    RecursoListComponent,
    RecursoFormComponent
  ],
  imports: [
    CommonModule
  ]
})
export class RecursosModule { }
