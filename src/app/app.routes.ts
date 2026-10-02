import { Routes } from '@angular/router';

import { Menu } from './menu/menu';
import { Inicio } from './inicio/inicio';
import { Pedido } from './pedido/pedido';

export const routes: Routes = [

  {
    path: '',
    component: Inicio
  },

  {
    path: 'menu',
    component: Menu
  },

  {
    path: 'pedido',
    component: Pedido
  },

  {
    path: '**',
    redirectTo: ''
  }

];