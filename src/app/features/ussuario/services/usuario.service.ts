import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private Url = 'http://localhost:8080/api/Usuario';

  constructor(private http: HttpClient) {}

  getUsuarioById(userId: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.Url}/${userId}`);
  }

  updateUsuario(userId: number, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.Url}/${userId}`, usuario);
  }
}
