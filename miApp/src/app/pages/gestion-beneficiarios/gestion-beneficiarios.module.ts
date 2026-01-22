import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GestionBeneficiariosPageRoutingModule } from './gestion-beneficiarios-routing.module';

import { GestionBeneficiariosPage } from './gestion-beneficiarios.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GestionBeneficiariosPageRoutingModule,
    SharedModule, 
    ReactiveFormsModule
  ],
  declarations: [GestionBeneficiariosPage]
})
export class GestionBeneficiariosPageModule {}
