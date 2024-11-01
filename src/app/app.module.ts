import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuariosModule } from './features/usuarios/usuarios.module';
import { RecursosModule } from './features/recursos/recursos.module';
import { SolicitudesModule } from './features/solicitudes/solicitudes.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LoginModule } from './features/login/login.module';
import { RevisorModule } from './features/revisor/revisor.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UsuariosModule,
    RecursosModule,
    SolicitudesModule,
    HttpClientModule,
    LoginModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
