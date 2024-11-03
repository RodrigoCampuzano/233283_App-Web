import { Injectable } from '@angular/core';
import { Solicitud } from '../models/revisor';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Solicitud_Recurso } from '../models/revisor';

@Injectable({
  providedIn: 'root'
})
export class RevisorService {

  private apiUrl = 'http://localhost:8080/api/';
  
  constructor(private http: HttpClient) { }

  getSolicitud(): Observable<Solicitud[]> {
    return this.http.get<Solicitud[]>(`${this.apiUrl}Solicitud`);
  }

  updateSolicitud(id: number, solicitud: Solicitud): Observable<Solicitud> { 
    return this.http.put<Solicitud>(`${this.apiUrl}Solicitud/${id}`, solicitud); 
  }

  getRecursos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}Recurso`);
  }

  getSolicitudesID(IDRevisor: number): Observable<Solicitud_Recurso[]>{
    return this.http.get<Solicitud_Recurso[]>(`${this.apiUrl}Solicitud/revisor/${IDRevisor}`)
  }
}
