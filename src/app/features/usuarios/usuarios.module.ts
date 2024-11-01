import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioListComponent } from './components/usuario-list/usuario-list.component';
import { UsuarioFormComponent } from './components/usuario-form/usuario-form.component';
import { UsuarioDashboardComponent } from './components/usuario-dashboard/usuario-dashboard.component';



@NgModule({
  declarations: [
    UsuarioListComponent,
    UsuarioFormComponent,
    UsuarioDashboardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    UsuarioFormComponent,
    UsuarioListComponent,
    UsuarioDashboardComponent
  ]
})
export class UsuariosModule { }
