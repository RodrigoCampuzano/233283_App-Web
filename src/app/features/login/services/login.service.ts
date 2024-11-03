import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../models/login';
import { Observable } from 'rxjs';
import { Registro } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private Url = 'http://localhost:8080/api/Usuario';

  constructor(private http: HttpClient) { }

  postLogin(login: Login): Observable<any> {
    return this.http.post<any>(`${this.Url}/login`, login);
  }

  postRegister(registro: Registro): Observable<Registro>{
    return this.http.post<Registro>(`${this.Url}/register`, registro);
  }
}
