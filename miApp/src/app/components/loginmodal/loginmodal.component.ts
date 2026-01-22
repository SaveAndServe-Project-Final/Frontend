
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../../services/autentificacion/auth.service';
import { RegistroOpcionesModalComponent } from '../registro-opciones-modal/registro-opciones-modal.component';
import { ForgotPasswordModalComponent } from '../forgot-password-modal/forgot-password-modal.component';

@Component({
  selector: 'app-loginmodal',
  templateUrl: './loginmodal.component.html',
  styleUrls: ['./loginmodal.component.scss'],
  standalone: false
})
export class LoginmodalComponent implements OnInit {

  loginData = {
    email: '',
    password: ''
  };

  constructor(
    private modalController: ModalController,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
  }

  onLogin() {
    this.authService.login(this.loginData.email, this.loginData.password)
      .subscribe({
        next: (response: any) => {
          const userRole = this.authService.getUserRole();
          const userName = this.authService.getUserName();
          this.modalController.dismiss({ loggedIn: true, userRole, userName });
                  window.location.reload();

        },
        error: (error: any) => {
          console.error('Error de inicio de sesión', error);
          this.presentToast('Error al iniciar sesión. Compruebe sus credenciales.', 'danger');
        }
      });
  }

  async presentToast(message: string, color: string = 'success') {
    const toast = document.createElement('ion-toast');
    toast.message = message;
    toast.duration = 2000;
    toast.color = color;
    toast.position = 'bottom';

    document.body.appendChild(toast);
    return toast.present();
  }

  dismissModal() {
    this.modalController.dismiss();
  }

  async presentForgotPasswordModal() {
    const modal = await this.modalController.create({
      component: ForgotPasswordModalComponent,
      cssClass: 'auth-modal'
    });
    await modal.present();
  }

  async presentRegisterOptions() {
    const modal = await this.modalController.create({
      component: RegistroOpcionesModalComponent,
      cssClass: 'auth-modal'
    });
    await modal.present();
  }
}
