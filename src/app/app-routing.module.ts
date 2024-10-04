import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { ProyectosFormComponent } from './features/proyectos/form/form.component';

const routes: Routes = [
  { path: 'usuarios', loadChildren:() => import('./features/usuarios/usuarios.module').then(m => m.UsuariosModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }




