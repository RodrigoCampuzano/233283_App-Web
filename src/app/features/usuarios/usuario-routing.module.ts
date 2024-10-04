import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioListComponent } from './components/usuario-list/usuario-list.component';
import { UsuarioFormComponent } from './components/usuario-form/usuario-form.component';

const routes: Routes = [
  { path: '', component: UsuarioListComponent },
  { path: 'create', component: UsuarioFormComponent },
  { path: 'edit/:id', component: UsuarioFormComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
