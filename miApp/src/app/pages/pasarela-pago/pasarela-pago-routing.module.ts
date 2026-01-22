import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PasarelaPagoPage } from './pasarela-pago.page';

const routes: Routes = [
  {
    path: '',
    component: PasarelaPagoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PasarelaPagoPageRoutingModule {}

