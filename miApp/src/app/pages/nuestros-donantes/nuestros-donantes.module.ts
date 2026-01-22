import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuestrosDonantesPageRoutingModule } from './nuestros-donantes-routing.module';

import { NuestrosDonantesPage } from './nuestros-donantes.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NuestrosDonantesPageRoutingModule,
    SharedModule
  ],
  declarations: [NuestrosDonantesPage]
})
export class NuestrosDonantesPageModule {}
