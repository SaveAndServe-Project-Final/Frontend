import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilDonantePage } from './perfil-donante.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilDonantePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilDonantePageRoutingModule {}
