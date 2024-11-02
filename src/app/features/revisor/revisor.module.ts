import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevisorDashComponent } from './components/revisor-dash/revisor-dash.component';
import { RevisorPeticionesComponent } from './components/revisor-peticiones/revisor-peticiones.component';



@NgModule({
  declarations: [
    RevisorDashComponent,
    RevisorPeticionesComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RevisorDashComponent,
    RevisorPeticionesComponent
  ]
})
export class RevisorModule { }
