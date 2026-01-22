import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DonacionesPageRoutingModule } from './donaciones-routing.module';

import { DonacionesPage } from './donaciones.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { TablaDonacionesComponent } from "../../components/tabla-donaciones/tabla-donaciones.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    DonacionesPageRoutingModule,
    SharedModule,
    TablaDonacionesComponent
],
  declarations: [DonacionesPage],
})
export class DonacionesPageModule { }
