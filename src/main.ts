import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app'; // Cambiado de App a AppComponent

bootstrapApplication(AppComponent, appConfig) // Usamos la clase correcta
  .catch((err) => console.error(err));