import { ModalController, MenuController } from '@ionic/angular';
import { EmpresaRegistroModalComponent } from '../empresa-registro-modal/empresa-registro-modal.component';
import { RegistroDonanteComponent } from '../registro-donante/registro-donante.component';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LoginmodalComponent } from '../loginmodal/loginmodal.component';
import { RegistroBeneficiarioComponent } from '../registro-beneficiario/registro-beneficiario.component';

@Component({
  selector: 'app-registro-opciones-modal',
  templateUrl: './registro-opciones-modal.component.html',
  styleUrls: ['./registro-opciones-modal.component.scss'],
  standalone: false
})
export class RegistroOpcionesModalComponent implements OnInit {
dismissModal() {
throw new Error('Method not implemented.');
}

  donanteLoading = false;
  beneficiarioLoading = false;

  constructor(
    private menuCtrl: MenuController,
    private modalCtrl: ModalController,
    private router: Router
  ) { }

  ngOnInit(): void { }

  closeMenu() {
    this.modalCtrl.dismiss();
  }

  async abrirRegistroDonante() {
    this.donanteLoading = true;

    setTimeout(async () => {
      this.donanteLoading = false;
      await this.modalCtrl.dismiss();

      const modal = await this.modalCtrl.create({
        component: RegistroDonanteComponent
     
      });
      await modal.present();
    }, 500);
  }

  async abrirRegistroBeneficiario() {
    this.beneficiarioLoading = true;

    setTimeout(async () => {
      this.beneficiarioLoading = false;
      await this.modalCtrl.dismiss();

      const modal = await this.modalCtrl.create({
        component: RegistroBeneficiarioComponent,
      });
      await modal.present();
    }, 500);
  }

  async backToLogin() {
    await this.modalCtrl.dismiss();
    const loginModal = await this.modalCtrl.create({
      component: LoginmodalComponent,
      cssClass: 'auth-modal'
    });
    await loginModal.present();
  }
}
