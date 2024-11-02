import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Solicitud } from '../models/solicitud';
import { Revisor } from '../models/revisor';
import { Recurso } from '../models/recurso';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  
  private apiUrl = 'http://localhost:8080/api/';
  
  constructor(private http: HttpClient) { }

  getSolicitud(): Observable<Solicitud[]> {
    return this.http.get<Solicitud[]>(`${this.apiUrl}Solicitud`); // Asegúrate de que esta URL sea correcta
  }

  getSolicitudid(id: number): Observable<Solicitud> {
    return this.http.get<Solicitud>(`${this.apiUrl}Solicitud/${id}`);
  }

  createSolicitud(recurso: Solicitud): Observable<Solicitud> { // Cambia `any` por `Solicitud` si es apropiado
    return this.http.post<Solicitud>(`${this.apiUrl}Solicitud`, recurso);
  }

  updateSolicitud(id: number, solicitud: Solicitud): Observable<Solicitud> { // Cambia `any` por `Solicitud`
    return this.http.put<Solicitud>(`${this.apiUrl}Solicitud/${id}`, solicitud); // Asegúrate de que haya una `/` antes del id
  }

  deleteSolicitudid(id: number): Observable<void> { // Corrige el nombre del método
    return this.http.delete<void>(`${this.apiUrl}Solicitud/${id}`); // Asegúrate de que haya una `/` antes del id
  }

  getRecursos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}Recurso`);
  }

  getRevisores(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}Usuario/obtener`);
  }
  
}
