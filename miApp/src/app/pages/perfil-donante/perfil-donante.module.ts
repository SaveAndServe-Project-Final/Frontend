import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilDonantePageRoutingModule } from './perfil-donante-routing.module';

import { PerfilDonantePage } from './perfil-donante.page';
import { share } from 'rxjs';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilDonantePageRoutingModule,
    SharedModule
  ],
  declarations: [PerfilDonantePage]
})
export class PerfilDonantePageModule {}
