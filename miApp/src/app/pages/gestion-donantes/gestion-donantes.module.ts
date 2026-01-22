import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GestionDonantesPageRoutingModule } from './gestion-donantes-routing.module';

import { GestionDonantesPage } from './gestion-donantes.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GestionDonantesPageRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [GestionDonantesPage]
})
export class GestionDonantesPageModule {}
