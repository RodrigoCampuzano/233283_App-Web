import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginDashboardComponent } from './components/login-dashboard/login-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LoginDashboardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    LoginDashboardComponent
  ]
})
export class LoginModule { }
