import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Investigador } from '../models/investigador';

@Injectable({
  providedIn: 'root'
})
export class InvestigadorService {
  private apiUrl = 'http://localhost:8080/api/Recurso'; 
  constructor(private http: HttpClient) { }

  getRecursosByUserId(userId: number): Observable<Investigador[]> {
    return this.http.get<Investigador[]>(`${this.apiUrl}?userId=${userId}`);
  }

  deleteRecursoId(id: number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
  }

  updateSolicitud(id: number, recurso: Investigador): Observable<Investigador> { 
    return this.http.put<Investigador>(`${this.apiUrl}/${id}`, recurso); 
  }


}
