import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { RegistroBeneficiarioDataService } from '../../services/registroBeneficiario/registro-beneficiario-data.service';
import { BancoalimentosService } from 'src/app/services/bancoAlimentoService/bancoalimentos.service';
import { ModalController, MenuController, IonicModule, AlertController } from '@ionic/angular';
import { LoginmodalComponent } from '../loginmodal/loginmodal.component';
import { CommonModule } from '@angular/common';
import { TerminosCondicionesModalComponent } from '../terminos-condiciones-modal/terminos-condiciones-modal.component';

@Component({
  selector: 'app-registro-beneficiario',
  templateUrl: './registro-beneficiario.component.html',
  styleUrls: ['./registro-beneficiario.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    IonicModule,
      TerminosCondicionesModalComponent

  ]
})
export class RegistroBeneficiarioComponent implements OnInit {
  beneficiarioForm!: FormGroup;
  showModal = false;

  ciudades: string[] = [
    'Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Zaragoza',
    'Málaga', 'Murcia', 'Palma de Mallorca', 'Las Palmas de Gran Canaria', 'Bilbao',
    'Alicante', 'Córdoba', 'Valladolid', 'Vigo', 'Gijón', "L'Hospitalet de Llobregat",
    'A Coruña', 'Vitoria-Gasteiz', 'Elche', 'Granada', 'Oviedo',
    'Badalona', 'Cartagena', 'Terrassa', 'Jerez de la Frontera', 'Sabadell',
    'Móstoles', 'Alcalá de Henares', 'Getafe', 'Almería', 'Santander',
    'Castellón de la Plana', 'Burgos', 'Albacete', 'San Sebastián', 'Logroño',
    'Cáceres', 'Salamanca', 'Huelva', 'Badajoz', 'Tarragona',
    'León', 'Lleida', 'Cádiz', 'Jaén', 'Tenerife',
    'Marbella', 'Fuenlabrada', 'Santa Cruz de Tenerife', 'Mataró', 'Tarragona',
    'San Cristóbal de La Laguna', 'Reus', 'Pamplona', 'Toledo', 'Girona',
    'Algeciras', 'Córdoba', 'San Sebastián de los Reyes', 'Sant Cugat del Vallès', 'Torrejón de Ardoz',
    'Pontevedra', 'Segovia', 'Soria', 'Cuenca', 'Teruel',
    'Córdoba', 'Huesca', 'Ciudad Real', 'Zamora', 'Vigo'
  ];

  constructor(
    private menuCtrl: MenuController,
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private bancoAliementoService: BancoalimentosService,
    private registroBeneficiarioDataService: RegistroBeneficiarioDataService,
    private router: Router,
      private alertController: AlertController,
      private modalController: ModalController

  ) {}

  ngOnInit() {
    this.initBeneficiarioForm();
  }

  initBeneficiarioForm() {
    this.beneficiarioForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
      email: ['', [Validators.required, Validators.email]],
      ciudad: ['', Validators.required],
      direccion: ['', Validators.required],
      contrasenia: ['', [Validators.required, Validators.minLength(6)]],
      terms: [false, Validators.requiredTrue]
    });
  }

  openRegisterModal() {
    this.showModal = true;
  }

  closeRegisterModal() {
    this.modalCtrl.dismiss();
  }

  toggleLogin() {
    this.closeRegisterModal();
  }

 async openTerms(event: Event) {
  event.preventDefault(); 
  const modal = await this.modalController.create({
    component: TerminosCondicionesModalComponent,
  });
  await modal.present();
}

 
registro() {
  if (this.beneficiarioForm.invalid) {
    this.beneficiarioForm.markAllAsTouched();
    return;
  }

  this.bancoAliementoService.create(this.beneficiarioForm.value).subscribe({
    next: async (response) => {
      const alert = await this.alertController.create({
        header: 'Registro exitoso',
        message: 'Tu cuenta ha sido creada correctamente.',
        buttons: ['Aceptar']
      });
      await alert.present();

      this.beneficiarioForm.reset();
      this.router.navigate(['/home']);
    },
    error: async (err) => {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'No se pudo completar el registro. Intenta nuevamente.',
        buttons: ['Cerrar']
      });
      await alert.present();
    }
  });
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
