import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArticulosPageRoutingModule } from './articulos-routing.module';

import { ArticulosPage } from './articulos.page';
import { HeroSectionArticulosComponent } from 'src/app/components/hero-section-articulos/hero-section-articulos.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArticulosPageRoutingModule,
    SharedModule
  ],
  declarations: [ArticulosPage,HeroSectionArticulosComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  
})
export class ArticulosPageModule {}
