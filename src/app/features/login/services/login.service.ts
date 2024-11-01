import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../models/login';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private Url = ''

  constructor(private http: HttpClient) { }

  postLogin(login : Login): Observable<Login> {
    return this.http.post<Login>(this.Url, login);
  }

}
