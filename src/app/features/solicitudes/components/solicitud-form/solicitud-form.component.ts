import { Component } from '@angular/core';

@Component({
  selector: 'app-solicitud-form',
  templateUrl: './solicitud-form.component.html',
  styleUrl: './solicitud-form.component.css'
})
export class SolicitudFormComponent {
  valueTitulo = '';
  valueTipo = '';
  valueAutor = '';
  valueFecha = '';
  valueResumen = '';
  valueIdioma = '';
  valueCantPag = '';
  valueFile = 'Documento';
}
