import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuscripcionesPageRoutingModule } from './suscripciones-routing.module';

import { SuscripcionesPage } from './suscripciones.page';
import { TarifasComponent } from "../../components/tarifas/tarifas.component";
import { SharedModule } from '../../shared/shared.module';
// import { AppModule } from "../../app.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuscripcionesPageRoutingModule,
    SharedModule
],
  declarations: [SuscripcionesPage,TarifasComponent]
})
export class SuscripcionesPageModule {}
