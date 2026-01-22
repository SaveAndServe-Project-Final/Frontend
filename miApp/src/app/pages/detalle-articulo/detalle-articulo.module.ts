import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleArticuloPageRoutingModule } from './detalle-articulo-routing.module';

import { DetalleArticuloPage } from './detalle-articulo.page';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomePage } from '../home/home.page';

@NgModule({
  imports: [
    CommonModule,
      FormsModule,
      IonicModule,
      HttpClientModule,
      RouterModule.forChild([{ path: '', component: DetalleArticuloPage }]),
      SharedModule,
    DetalleArticuloPageRoutingModule
  ],
  declarations: [DetalleArticuloPage],
   schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DetalleArticuloPageModule {}
