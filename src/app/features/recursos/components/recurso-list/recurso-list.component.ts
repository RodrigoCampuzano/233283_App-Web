import { Component, OnInit } from '@angular/core';
import { Recurso } from '../../models/recurso';
import { RecursoService } from '../../services/recurso.service';

@Component({
  selector: 'app-recurso-list',
  templateUrl: './recurso-list.component.html',
  styleUrl: './recurso-list.component.css'
})
export class RecursoListComponent implements OnInit {
  recursos: Recurso[] = [];
  recursoSeleccionado: Recurso | null = null;

  constructor(private recursoService: RecursoService) {}

  ngOnInit(): void {
    this.cargarRecursos();
  }

  cargarRecursos() {
    this.recursoService.getRecursos().subscribe(
      (data) => {
        this.recursos = data;
      },
      (error) => {
        console.error('Error al cargar recursos', error);
      }
    );
  }

  editarRecurso(recurso: Recurso) {
    this.recursoSeleccionado = { ...recurso };
  }

  eliminarRecurso(id: number) {
    this.recursoService.deleteUserid(id).subscribe(
      () => {
        this.cargarRecursos();
      },
      (error) => {
        console.error('Error al eliminar el recurso', error);
      }
    );
  }

  actualizarRecurso() {
    if (this.recursoSeleccionado) {
      console.log("Datos a actualizar:", this.recursoSeleccionado); // Log de datos
      this.recursoService.updateRecurso(this.recursoSeleccionado.ID_Recurso, this.recursoSeleccionado)
        .subscribe(
          () => {
            this.cargarRecursos();
            this.recursoSeleccionado = null;
          },
          (error) => {
            console.error('Error al actualizar el recurso', error);
          }
        );
    }
  }
  
}
