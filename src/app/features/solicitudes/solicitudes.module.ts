import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolicitudListComponent } from './components/solicitud-list/solicitud-list.component';
import { SolicitudFormComponent } from './components/solicitud-form/solicitud-form.component';



@NgModule({
  declarations: [
    SolicitudListComponent,
    SolicitudFormComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SolicitudesModule { }
