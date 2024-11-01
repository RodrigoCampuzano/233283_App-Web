import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolicitudListComponent } from './components/solicitud-list/solicitud-list.component';
import { SolicitudFormComponent } from './components/solicitud-form/solicitud-form.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { SolicitudDashComponent } from './components/solicitud-dash/solicitud-dash.component';



@NgModule({
  declarations: [
    SolicitudListComponent,
    SolicitudFormComponent,
    SolicitudDashComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  exports: [
    SolicitudFormComponent,
    SolicitudListComponent,
    SolicitudDashComponent
  ]
})
export class SolicitudesModule { }
