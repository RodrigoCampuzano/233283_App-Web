import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Solicitud } from '../models/solicitud';


@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  
  private apiUrl = 'http://localhost:8080/api/';
  
  constructor(private http: HttpClient) { }

  getSolicitud(): Observable<Solicitud[]> {
    return this.http.get<Solicitud[]>(`${this.apiUrl}Solicitud`); 
  }

  getSolicitudid(id: number): Observable<Solicitud> {
    return this.http.get<Solicitud>(`${this.apiUrl}Solicitud/${id}`);
  }

  createSolicitud(recurso: Solicitud): Observable<Solicitud> { 
    return this.http.post<Solicitud>(`${this.apiUrl}Solicitud`, recurso);
  }

  updateSolicitud(id: number, solicitud: Solicitud): Observable<Solicitud> { 
    return this.http.put<Solicitud>(`${this.apiUrl}Solicitud/${id}`, solicitud); 
  }

  deleteSolicitudid(id: number): Observable<void> { 
    return this.http.delete<void>(`${this.apiUrl}Solicitud/${id}`); 
  }

  getRecursos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}Recurso`);
  }

  getRevisores(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}Usuario/obtener`);
  }
  
}
