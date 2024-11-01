import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginDashboardComponent } from './features/login/components/login-dashboard/login-dashboard.component';
import { UsuarioFormComponent } from './features/usuarios/components/usuario-form/usuario-form.component';
import { UsuarioDashboardComponent } from './features/usuarios/components/usuario-dashboard/usuario-dashboard.component';
import { RecursosDashComponent } from './features/recursos/components/recursos-dash/recursos-dash.component';
import { SolicitudDashComponent } from './features/solicitudes/components/solicitud-dash/solicitud-dash.component';
import { RecursoFormComponent } from './features/recursos/components/recurso-form/recurso-form.component';
import { SolicitudFormComponent } from './features/solicitudes/components/solicitud-form/solicitud-form.component';
import { RevisorDashComponent } from './features/revisor/components/revisor-dash/revisor-dash.component';


const routes: Routes = [
  { path: 'Login', component: LoginDashboardComponent },
  { path: 'Investigador/Recursos', component: RecursosDashComponent},
  { path: 'Investigador/CrearRecurso', component: RecursoFormComponent},
  { path: 'Investigador/Solicitudes', component: SolicitudDashComponent},
  { path: 'Investigador/CrearSolicitud', component: SolicitudFormComponent },
  { path: 'Revisor/Dashboard', component: RevisorDashComponent },
  /*
  { pat: '', component: },
  { pat: '', component: },*/
  { path: '', redirectTo:'/Login', pathMatch: 'full' },
  { path: '**', redirectTo:'/Login'}
];

@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }




