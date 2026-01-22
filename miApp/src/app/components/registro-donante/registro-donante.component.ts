import { Component, OnInit, Pipe } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SuscripcionService } from '../../services/suscripcionService/suscripcion.service';
import { RegistroDataService } from '../../services/registrodata/registro-data.service';
import { EmpresaService } from '../../services/empresaService/empresa.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroOpcionesModalComponent } from '../registro-opciones-modal/registro-opciones-modal.component';
import { LoginmodalComponent } from '../loginmodal/loginmodal.component';
import { MenuController, ModalController } from '@ionic/angular';
import { FilterCitiesPipe } from '../../pipes/filter-cities.pipe'; // Importa el pipe
import { TerminosCondicionesModalComponent } from '../terminos-condiciones-modal/terminos-condiciones-modal.component';
@Component({
  selector: 'app-registro-donante',
  templateUrl: './registro-donante.component.html',
  styleUrls: ['./registro-donante.component.scss'],
  standalone: false
})
export class RegistroDonanteComponent implements OnInit {

  empresaForm!: FormGroup;
  citySearch = '';

  tiposDeEmpresa = ['Hotel', 'Restaurante', 'Supermercado', 'Catering', 'Tienda', 'Bar', 'Cafetería', 'Otro'];
  ciudades: string[] = ['Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Zaragoza',
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
    'Córdoba', 'Huesca', 'Ciudad Real', 'Zamora', 'Vigo'];

  showModal = false;
  selectedPlan = 'BASICA';


  constructor(
    private menuCtrl: MenuController,
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private subscriptionService: SuscripcionService,
    private registroDataService: RegistroDataService,
    private empresaService: EmpresaService,
    private router: Router,
          private modalController: ModalController


  ) { }

  ngOnInit() {
    this.initEmpresaForm();
    // Cargar plan guardado
    this.selectedPlan = this.subscriptionService.getPlan() || 'BASICA';
    this.empresaForm.patchValue({ suscripcion: this.selectedPlan });
  }

  initEmpresaForm() {
    this.empresaForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      tipo: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
      email: ['', [Validators.required, Validators.email]],
      suscripcion: ['BASICA'],
      cif: ['', [Validators.required, Validators.minLength(9)]],
      direccion: ['', Validators.required],
      ciudad: ['', Validators.required],
      contrasenia: ['', [Validators.required, Validators.minLength(6)]],
      terms: [false, Validators.requiredTrue]
    });
  }

  openRegisterModal() { this.showModal = true; }
  closeRegisterModal() { this.modalCtrl.dismiss(); }


  selectPlan(plan: string | undefined) {
    if (!plan) return;
    this.selectedPlan = plan;
    this.empresaForm.patchValue({ suscripcion: plan });
    this.subscriptionService.setPlan(plan);
  }
  openSuscripciones(): void {
    this.router.navigate(['/suscripciones'])
      .then(success => {
        if (!success) {
          console.error('Falló la navegación a /suscripciones');
        }
      });
  }
  goToPayment() {
    if (this.empresaForm.invalid) {
      this.empresaForm.markAllAsTouched();
      return;
    }
    console.log(this.empresaForm.value);
    this.registroDataService.setEmpresaData(this.empresaForm.value);
    this.modalCtrl.dismiss();

    this.router.navigate(['/pasarela-pago']);
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
  async backToLogin() {
    await this.modalCtrl.dismiss();
    const loginModal = await this.modalCtrl.create({
      component: LoginmodalComponent,
      cssClass: 'auth-modal'
    });
    await loginModal.present();
  }

}
