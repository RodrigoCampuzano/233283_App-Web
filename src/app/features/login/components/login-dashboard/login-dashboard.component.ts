import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-login-dashboard',
  templateUrl: './login-dashboard.component.html',
  styleUrls: ['./login-dashboard.component.css']
})
export class LoginDashboardComponent {

  LoginForm: FormGroup;

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) {
    this.LoginForm = this.fb.group({
      Correo: [''],
      Contrasena: ['']
    });
  }

  onSubmit() {
    if (this.LoginForm.valid) {
      const loginData = this.LoginForm.value;

      this.loginService.postLogin(loginData).subscribe(
        (response: any) => {
          
          localStorage.setItem('token', response.token);
          localStorage.setItem('userId', response.id);
          localStorage.setItem('role', response.rol);

          if (response.rol === 0) {
            this.router.navigate(['Investigador/Recursos']);
          } else if (response.rol === 1) {
            this.router.navigate(['Revisor/Dashboard']);
          }
        },
        error => {
          console.error('Error de autenticación', error);
          alert('Error al iniciar sesión. Verifica tus credenciales.');
        }
      );
    } else {
      console.log('Formulario inválido', this.LoginForm.errors);
    }
  }
}
