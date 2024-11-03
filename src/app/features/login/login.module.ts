import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginDashboardComponent } from './components/login-dashboard/login-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistroComponent } from './components/registro/registro.component';



@NgModule({
  declarations: [
    LoginDashboardComponent,
    RegistroComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    LoginDashboardComponent,
    RegistroComponent
  ]
})
export class LoginModule { }
