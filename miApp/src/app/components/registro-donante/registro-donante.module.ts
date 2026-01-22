import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { RegistroDonanteComponent } from './registro-donante.component';
import { FilterCitiesPipe } from '../../pipes/filter-cities.pipe';
import { TerminosCondicionesModalComponent } from '../terminos-condiciones-modal/terminos-condiciones-modal.component';

@NgModule({
  declarations: [
    RegistroDonanteComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule,
    TerminosCondicionesModalComponent
  ],
  exports: [RegistroDonanteComponent]
})
export class RegistroDonanteModule { }

