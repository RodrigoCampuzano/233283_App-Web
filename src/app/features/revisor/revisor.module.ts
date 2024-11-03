import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevisorDashComponent } from './components/revisor-dash/revisor-dash.component';
import { RevisorPeticionesComponent } from './components/revisor-peticiones/revisor-peticiones.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    RevisorDashComponent,
    RevisorPeticionesComponent
  ],
  imports: [
    CommonModule,
    FormsModule
    
  ],
  exports: [
    RevisorDashComponent,
    RevisorPeticionesComponent
  ]
})
export class RevisorModule { }
