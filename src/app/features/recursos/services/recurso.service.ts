import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recurso } from '../models/recurso';

@Injectable({
  providedIn: 'root'
})
export class RecursoService {  
  
  private apiUrl = 'http://localhost:8080/api/Recurso';
  
  constructor(private http: HttpClient) { }

  getRecursos(): Observable<Recurso[]>{
    return this.http.get<Recurso[]>(this.apiUrl);
  }
  getRecursosid(id: number): Observable<Recurso> {
    return this.http.get<Recurso>(`${this.apiUrl}/${id}`);
  }
  createRecurso(recurso: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, recurso);
  }
  updateRecurso(id: number, recurso: Recurso): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, recurso);
  }
  deleteUserid(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
