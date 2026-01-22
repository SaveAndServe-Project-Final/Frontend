import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { HeroSectionComponent } from '../../components/hero-section/hero-section.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LoginmodalComponent } from '../../components/loginmodal/loginmodal.component';
import { CarouselComponent } from '../../components/carousel/carousel.component';
import { HowWorksComponent } from '../../components/how-works/how-works.component';
import { FeatureComponent } from '../../components/feature/feature.component';
import { StadisticComponent } from '../../components/stadistic/stadistic.component';
import { ImpactoComponent } from '../../components/impacto/impacto.component';
import { AccordionComponent } from "../../components/accordion/accordion.component";
import { SharedModule } from 'src/app/shared/shared.module';
import { RegistroOpcionesModalComponent } from 'src/app/components/registro-opciones-modal/registro-opciones-modal.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    RouterModule.forChild([{ path: '', component: HomePage }]),
    SharedModule
],
  declarations: [
    HomePage,
    HeroSectionComponent,
    LoginmodalComponent,
    CarouselComponent,
    HowWorksComponent,
    FeatureComponent,
    StadisticComponent,
    ImpactoComponent,
    AccordionComponent,
    RegistroOpcionesModalComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePageModule {}
