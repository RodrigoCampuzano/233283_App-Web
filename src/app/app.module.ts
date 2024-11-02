import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SolicitudesModule } from './features/solicitudes/solicitudes.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LoginModule } from './features/login/login.module';
import { RecursosModule } from './features/recursos/recursos.module';
import { InvestigadorModule } from './features/investigador/investigador.module';
import { RevisorModule } from './features/revisor/revisor.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    InvestigadorModule,
    LoginModule,
    RecursosModule,
    RevisorModule,
    AppRoutingModule,
    SolicitudesModule,
    HttpClientModule,

  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
