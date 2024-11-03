import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Registro } from '../../models/login'; 
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'] // Cambia `styleUrl` a `styleUrls`
})
export class RegistroComponent implements OnInit {
  RegistroForm: FormGroup;

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) {
    this.RegistroForm = this.fb.group({
      Nombre: ['', Validators.required],
      Apellido: ['', Validators.required],
      Correo: ['', Validators.required],
      AreaEspecializacion: ['', Validators.required],
      Institucion: ['', Validators.required],
      Contrasena: ['', Validators.required],
      Rol: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onRegister(): void {
    if (this.RegistroForm.valid) {
      const newUser: Registro = this.RegistroForm.value;

      this.loginService.postRegister(newUser).subscribe(
        (response) => {
          console.log('Registro exitoso:', response);
          this.router.navigate(['Login'])
        },
        (error) => {
          console.error('Error en el registro:', error);
          // Aquí puedes manejar el error
        }
      );
    } else {
      console.log('Formulario inválido');
    }
  }

  cancelar(){
    this.router.navigate(['Login'])
  }
}
