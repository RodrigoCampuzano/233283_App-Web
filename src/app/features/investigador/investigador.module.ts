import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvestigadorDashComponent } from './components/investigador-dash/investigador-dash.component';



@NgModule({
  declarations: [
    InvestigadorDashComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    InvestigadorDashComponent
  ]
})
export class InvestigadorModule { }
