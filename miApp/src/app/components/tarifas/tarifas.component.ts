import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { EmpresaRegistroModalComponent } from '../../components/empresa-registro-modal/empresa-registro-modal.component'; 
import { RegistroDonanteComponent } from '../registro-donante/registro-donante.component';

@Component({
  selector: 'app-tarifas',
  templateUrl: './tarifas.component.html',
  styleUrls: ['./tarifas.component.scss'],
  standalone:false
})
export class TarifasComponent  implements OnInit {
  

  constructor(private router: Router,private modalController: ModalController) { }

  ngOnInit() {}
  openSuscripcion(plan: string) {
    console.log(`Navegando a suscripción del plan: ${plan}`);
    this.router.navigate(['/suscripcion', plan]);
  }
  async openRegister() {
   
    const modal = await this.modalController.create({
      component: RegistroDonanteComponent, 
      cssClass: 'registro-donante-modal'
    });
    return await modal.present();
  }

}
