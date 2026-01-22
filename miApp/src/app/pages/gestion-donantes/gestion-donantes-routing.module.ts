import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GestionDonantesPage } from './gestion-donantes.page';

const routes: Routes = [
  {
    path: '',
    component: GestionDonantesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionDonantesPageRoutingModule {}
