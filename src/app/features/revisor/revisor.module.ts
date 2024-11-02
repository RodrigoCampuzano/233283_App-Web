import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevisorListComponent } from './components/revisor-list/revisor-list.component';
import { RevisorDashComponent } from './components/revisor-dash/revisor-dash.component';
import { RevisorPeticionesComponent } from './components/revisor-peticiones/revisor-peticiones.component';



@NgModule({
  declarations: [
    RevisorListComponent,
    RevisorDashComponent,
    RevisorPeticionesComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RevisorListComponent,
    RevisorDashComponent
  ]
})
export class RevisorModule { }
