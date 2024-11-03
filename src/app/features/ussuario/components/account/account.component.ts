import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../../models/usuario'; 
import { UsuarioService } from '../../services/usuario.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  ActualizarForm: FormGroup;

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, private router: Router) {
    this.ActualizarForm = this.fb.group({
      Nombre: ['', Validators.required],
      Apellido: ['', Validators.required],
      Correo: ['', [Validators.required, Validators.email]],
      AreaEspecializacion: ['', Validators.required],
      Institucion: ['', Validators.required],
      Contrasena: ['', [Validators.minLength(6)]], // Opcional
      Rol: [''] // Opcional
    });
  }

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    const rol = localStorage.getItem('role'); // Obtener el rol del localStorage

    if (userId) {
      this.getUsuario(Number(userId)); 
      // Establecer el rol en el formulario si existe
      if (rol) {
        this.ActualizarForm.patchValue({ Rol: rol });
      }
    }
  }

  getUsuario(userId: number): void {
    this.usuarioService.getUsuarioById(userId).subscribe(
      (usuario: Usuario) => {
        this.ActualizarForm.patchValue({
          Nombre: usuario.Nombre,
          Apellido: usuario.Apellido,
          Correo: usuario.Correo,
          AreaEspecializacion: usuario.AreaEspecializacion,
          Institucion: usuario.Institucion,
          Rol: usuario.Rol || localStorage.getItem('role') // Asigna el rol desde localStorage si no está en el usuario
        });
      },
      error => {
        console.error('Error al obtener usuario:', error);
      }
    );
  }
  
  onUpdate(): void {
    console.log('Estado del formulario:', this.ActualizarForm.valid); // Esto debe ser true para que el formulario se considere válido
    if (this.ActualizarForm.valid) {
      const updatedUser: Usuario = { 
        ...this.ActualizarForm.value, 
        IDUsuario: Number(localStorage.getItem('userId')),
        Rol: localStorage.getItem('role') // Asegúrate de incluir el rol aquí
      };
  
      this.usuarioService.updateUsuario(updatedUser.IDUsuario, updatedUser).subscribe(
        (response) => {
          console.log('Actualización exitosa:', response);
        },
        (error) => {
          console.error('Error al actualizar usuario:', error);
        }
      );
    } else {
      console.log('Formulario inválido');
    }
  }
  
  
  
  
  
  cancelar(){
    this.router.navigate(['Investigador/Recursos']);
  }
}
