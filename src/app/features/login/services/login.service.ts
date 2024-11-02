import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../models/login';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private Url = 'http://localhost:8080/api/Usuario/login';

  constructor(private http: HttpClient) { }

  postLogin(login: Login): Observable<any> {
    return this.http.post<any>(this.Url, login);
  }
}
