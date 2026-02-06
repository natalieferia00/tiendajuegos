import { Routes } from '@angular/router';
import { TiendaComponent } from './components/tienda/tienda.component';

export const routes: Routes = [
  { path: '', component: TiendaComponent }, // Esto hace que la tienda sea lo primero que se ve
  { path: 'tienda', component: TiendaComponent }
];