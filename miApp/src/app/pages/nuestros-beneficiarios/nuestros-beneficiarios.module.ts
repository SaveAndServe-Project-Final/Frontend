
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuestrosBeneficiariosPageRoutingModule } from './nuestros-beneficiarios-routing.module';

import { NuestrosBeneficiariosPage } from './nuestros-beneficiarios.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NuestrosBeneficiariosPageRoutingModule,
    SharedModule
  ],
  declarations: [NuestrosBeneficiariosPage]
})
export class NuestrosBeneficiariosPageModule {}
