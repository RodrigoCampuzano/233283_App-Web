import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Solicitud } from '../models/solicitud';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  
  private apiUrl = 'http://localhost:8080/api/Solicitud';
  
  constructor(private http: HttpClient) { }

  getSolicitud(): Observable<Solicitud[]>{
    return this.http.get<Solicitud[]>(this.apiUrl);
  }
  getSolicitudid(id: number): Observable<Solicitud> {
    return this.http.get<Solicitud>(`${this.apiUrl}/${id}`);
  }
  createSolicitud(recurso: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, recurso);
  }
  updateSolicitud(id: number, solicitud: Solicitud): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, solicitud);
  }
  deleteSilicitudid(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
