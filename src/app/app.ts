import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TiendaComponent } from './components/tienda/tienda.component';
import { MochilaComponent } from './components/mochila/mochila';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TiendaComponent, MochilaComponent],
  template: `
    <app-mochila></app-mochila> 
    
    <main>
      <router-outlet></router-outlet>

      </main>
  `
})
export class AppComponent { }