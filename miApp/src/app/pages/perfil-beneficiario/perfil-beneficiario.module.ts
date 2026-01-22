import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilBeneficiarioPageRoutingModule } from './perfil-beneficiario-routing.module';

import { PerfilBeneficiarioPage } from './perfil-beneficiario.page';
import { share } from 'rxjs';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilBeneficiarioPageRoutingModule,
    SharedModule
  ],
  declarations: [PerfilBeneficiarioPage]
})
export class PerfilBeneficiarioPageModule {}
