import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { RouteConfigLoadEnd, Router } from '@angular/router'; 


@Component({
  selector: 'app-login-dashboard',
  templateUrl: './login-dashboard.component.html',
  styleUrl: './login-dashboard.component.css'
})
export class LoginDashboardComponent {

  LoginForm: FormGroup;

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router ){
    this.LoginForm = this.fb.group({
      correo:[''],
      contrasena:[''],
      role:['1']
    })
  }

  onSubmit(){
    console.log('GOLLA');
    if (this.LoginForm.valid) {
      const loginData = this.LoginForm.value;
      const role = 0+1;
          if (role === 0) {
            this.router.navigate(['Investigador/Recursos']);
          } else if (role === 1) {
            this.router.navigate(['Revisor/Dashboard']);
          }
    }
  }
}


/*
this.loginService.postLogin(loginData).subscribe(
        (response: any) => {
          
        },
        error => {
          console.error('Error de autenticación', error);
        }
      );
    } else {
      console.log('Formulario inválido', this.LoginForm.errors);*/