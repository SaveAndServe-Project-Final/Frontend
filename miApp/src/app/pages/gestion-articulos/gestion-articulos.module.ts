import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GestionArticulosPageRoutingModule } from './gestion-articulos-routing.module';

import { GestionArticulosPage } from './gestion-articulos.page';
import { share } from 'rxjs';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GestionArticulosPageRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [GestionArticulosPage]
})
export class GestionArticulosPageModule {}
