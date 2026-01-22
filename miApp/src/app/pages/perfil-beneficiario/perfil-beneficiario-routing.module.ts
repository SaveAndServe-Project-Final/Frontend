import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilBeneficiarioPage } from './perfil-beneficiario.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilBeneficiarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilBeneficiarioPageRoutingModule {}
