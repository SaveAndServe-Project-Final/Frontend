import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NuestrosDonantesPage } from './nuestros-donantes.page';

const routes: Routes = [
  {
    path: '',
    component: NuestrosDonantesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NuestrosDonantesPageRoutingModule {}
