import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginDashboardComponent } from './features/login/components/login-dashboard/login-dashboard.component';
import { SolicitudDashComponent } from './features/solicitudes/components/solicitud-dash/solicitud-dash.component';
import { RecursoFormComponent } from './features/recursos/components/recurso-form/recurso-form.component';
import { SolicitudFormComponent } from './features/solicitudes/components/solicitud-form/solicitud-form.component';
import { RevisorDashComponent } from './features/revisor/components/revisor-dash/revisor-dash.component';
import { RevisorPeticionesComponent } from './features/revisor/components/revisor-peticiones/revisor-peticiones.component';
import { InvestigadorDashComponent } from './features/investigador/components/investigador-dash/investigador-dash.component';


const routes: Routes = [
  { path: 'Login', component: LoginDashboardComponent },
  { path: 'Investigador/Recursos', component: InvestigadorDashComponent},
  { path: 'Investigador/CrearRecurso', component: RecursoFormComponent},
  { path: 'Investigador/Solicitudes', component: SolicitudDashComponent},
  { path: 'Investigador/CrearSolicitud', component: SolicitudFormComponent },
  { path: 'Revisor/Dashboard', component: RevisorDashComponent },
  { path: 'Revisor/Peticiones', component: RevisorPeticionesComponent},
  { path: '', redirectTo:'/Login', pathMatch: 'full' },
  { path: '**', redirectTo:'/Login'}
];

@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }




