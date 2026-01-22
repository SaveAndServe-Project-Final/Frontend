import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';                   
import { ReactiveFormsModule } from '@angular/forms';             
import { IonicModule } from '@ionic/angular';                     
import { RouterModule } from '@angular/router';

import { FilterCitiesPipe } from '../../pipes/filter-cities.pipe';
import { RegistroBeneficiarioComponent } from './registro-beneficiario.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    RegistroBeneficiarioComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,             
    ReactiveFormsModule,     
    RouterModule,
    
  ],
  exports: [RegistroBeneficiarioComponent]
})
export class RegistroBeneficiarioModule {}
