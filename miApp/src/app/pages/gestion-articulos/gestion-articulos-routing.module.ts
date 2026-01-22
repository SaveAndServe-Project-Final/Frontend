import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GestionArticulosPage } from './gestion-articulos.page';

const routes: Routes = [
  {
    path: '',
    component: GestionArticulosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionArticulosPageRoutingModule {}
