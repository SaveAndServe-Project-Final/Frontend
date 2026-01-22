import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PasarelaPagoPageRoutingModule } from './pasarela-pago-routing.module';

import { PasarelaPagoPage } from './pasarela-pago.page';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PasarelaPagoPageRoutingModule,
    SharedModule
  ],
  declarations: [PasarelaPagoPage]
})
export class PasarelaPagoPageModule {}

