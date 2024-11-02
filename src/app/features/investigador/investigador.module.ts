import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvestigadorDashComponent } from './components/investigador-dash/investigador-dash.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    InvestigadorDashComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    InvestigadorDashComponent
  ]
})
export class InvestigadorModule { }
