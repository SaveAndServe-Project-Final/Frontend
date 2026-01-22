import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GestionBeneficiariosPage } from './gestion-beneficiarios.page';

const routes: Routes = [
  {
    path: '',
    component: GestionBeneficiariosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionBeneficiariosPageRoutingModule {}
