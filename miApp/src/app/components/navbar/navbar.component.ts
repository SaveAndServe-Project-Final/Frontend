import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, ActionSheetController, Platform } from '@ionic/angular';
import { SuscripcionService } from '../../services/suscripcionService/suscripcion.service';
import { AuthService } from '../../services/autentificacion/auth.service';
import { BancoalimentosService } from '../../services/bancoAlimentoService/bancoalimentos.service';
import { BancoDeAlimentos } from '../../models/bancoAlimentos.model';
import { Empresa } from '../../models/empresa.model';
import { EmpresaService } from '../../services/empresaService/empresa.service';
import { LoginmodalComponent } from 'src/app/components/loginmodal/loginmodal.component';
import { RegistroOpcionesModalComponent } from '../registro-opciones-modal/registro-opciones-modal.component';
import { ForgotPasswordModalComponent } from '../forgot-password-modal/forgot-password-modal.component';
import { EmpresaRegistroModalComponent } from '../empresa-registro-modal/empresa-registro-modal.component';
import { BeneficiarioRegistroModalComponent } from '../beneficiario-registro-modal/beneficiario-registro-modal.component';
import { RegistroDataService } from 'src/app/services/registrodata/registro-data.service';
import { NuestrosDonantesPage } from 'src/app/pages/nuestros-donantes/nuestros-donantes.page';
import { RegistroDonanteComponent } from '../registro-donante/registro-donante.component';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: false

})
export class NavbarComponent implements OnInit {
  beneficiarioForm!: FormGroup;
  empresaForm!: FormGroup;
  searchTerm: string = '';
  selectedPlan: string = 'BASICA';
  isMobile: boolean = false;

  loginData = {
    email: '',
    password: ''
  };

  isLoggedIn: boolean = false;
  userRole: string | null = null;
  userName: string | null = null;
  tiposDeEmpresa: string[] = ['Hotel', 'Restaurante', 'Supermercado', 'Catering', 'Tienda', 'Bar', 'Cafetería', 'Otro'];
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

  menuItems = [
    { title: 'Inicio', url: '/home' },
    { title: 'Blog', url: '/articles' },
    { title: 'Involúcrate', url: '/involucrate' }
  ];

  constructor(
    @Inject(Platform) private platform: Platform,
    private modalController: ModalController,
    private actionSheetController: ActionSheetController,
    @Inject(Router) private router: Router,
    private subscriptionService: SuscripcionService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private bancoAlimentoService: BancoalimentosService,
    private empresaService: EmpresaService,
    private registroDataService: RegistroDataService
  ) { }

  ngOnInit(): void {
    this.checkAuthStatus();
    this.initForm();
    this.initEmpresaForm();
    this.selectedPlan = this.subscriptionService.getPlan() || 'BASICA';
    this.ciudades.sort((a, b) => a.localeCompare(b));

    // Detectar si es móvil
    this.platform.ready().then(() => {
      this.isMobile = this.platform.width() < 768;
      this.platform.resize.subscribe(() => {
        this.isMobile = this.platform.width() < 768;
      });
    });
  }
  goToTop() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
  private initForm(): void {
    this.beneficiarioForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
      email: ['', [Validators.required, Validators.email]],
      ciudadEmpresa: ['', Validators.required],
      direccion: ['', Validators.required],
      contrasenia: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  private initEmpresaForm(): void {
    this.empresaForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      tipo: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
      email: ['', [Validators.required, Validators.email]],
      cif: ['', [Validators.required, Validators.minLength(9)]],
      direccion: ['', Validators.required],
      ciudad: ['', Validators.required],
      contrasenia: ['', [Validators.required, Validators.minLength(6)]],
      suscripcion: [this.selectedPlan]
    });
  }

  private checkAuthStatus() {
    this.isLoggedIn = this.authService.isLoggedIn();

    if (this.isLoggedIn) {
      this.userRole = this.authService.getUserRole();
      this.userName = this.authService.getUserName();
    }
  }


  async presentLoginModal() {
    const modal = await this.modalController.create({
      component: LoginmodalComponent,
      cssClass: 'auth-modal'
    });
    await modal.present();

    const { data } = await modal.onDidDismiss();
    // if (data && data.loggedIn) {
    //   this.checkAuthStatus();
    //   this.navigateBasedOnRole(this.userRole);
    // }
    if (data?.loggedIn) {
      this.userRole = data.userRole;
      this.userName = data.userName;
      this.navigateBasedOnRole(this.userRole);
      this.presentToast(`¡Bienvenido, ${this.userName}!`);
    }
  }


  async presentRegisterOptions() {
    const modal = await this.modalController.create({
      component: RegistroOpcionesModalComponent,
      cssClass: 'auth-modal'
    });
    await modal.present();
  }

  async presentForgotPasswordModal() {
    const modal = await this.modalController.create({
      component: ForgotPasswordModalComponent,
      cssClass: 'auth-modal'
    });
    await modal.present();
  }

  async presentDonanteForm() {
    const modal = await this.modalController.create({
      component: EmpresaRegistroModalComponent,
      cssClass: 'auth-modal',
      componentProps: {
        selectedPlan: this.selectedPlan
      }
    });
    await modal.present();
  }
  articulos() {
    this.router.navigate(['/articulos']);
  }
  nuestrosDonantes() {
    this.router.navigate(['/nuestros-donantes']);
  }
  nuestrosBeneficiarios() {
    this.router.navigate(['/nuestros-beneficiarios']);
  }
  async presentBeneficiarioForm() {
    const modal = await this.modalController.create({
      component: BeneficiarioRegistroModalComponent,
      cssClass: 'auth-modal'
    });
    await modal.present();
  }

  async presentUserMenu() {
    const actionSheet = await this.actionSheetController.create({
      header: this.isLoggedIn ? `Hola, ${this.userName}` : 'Cuenta',
      buttons: this.getUserMenuButtons()
    });
    await actionSheet.present();
  }

  async presentInvolucrarseActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Involúcrate',
      buttons: [
        {
          text: 'Nuestros Donantes',
          icon: 'business',
          handler: () => {
            this.nuestrosDonantes();
          }
        },
        {
          text: 'Nuestros Beneficiarios',
          icon: 'basket',
          handler: () => {
            this.nuestrosBeneficiarios();
          }
        },
        {
          text: 'Suscripciones',
          icon: 'pricetag-outline',
          handler: () => {
            this.presentSuscripciones();
          }
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }

  presentSuscripciones() {
    this.router.navigate(['/suscripciones']);
  }
  index() {
    this.router.navigate(['/home']);
  }

  private getUserMenuButtons(): Array<{ text: string; icon: string; handler: () => void; role?: string }> {
    if (this.isLoggedIn) {
      const buttons = [];
      if (this.userRole !== 'ADMIN') {
        buttons.push({
          text: 'Mi Perfil',
          icon: 'person',
          handler: () => {
            if (this.userRole === 'EMPRESA') {
              this.router.navigate(['/perfil-donante']);
            } else if (this.userRole === 'BANCO_DE_ALIMENTOS') {
              this.router.navigate(['/perfil-beneficiario']);
            } else {
              this.router.navigate(['/perfil']); 
            }
          }
        });
      }

      // Zona según rol
      if (this.userRole === 'EMPRESA') {
        buttons.push({
          text: 'Zona Empresa',
          icon: 'business',
          handler: () => {
            this.router.navigate(['/donaciones']);
          }
        });
      } else if (this.userRole === 'ADMIN') {
        buttons.push({
          text: 'Zona Admin',
          icon: 'settings',
          handler: () => {
            this.router.navigate(['/administracion']);
          }
        });
      } else if (this.userRole === 'BANCO_DE_ALIMENTOS') {
        buttons.push({
          text: 'Zona Banco Alimentos',
          icon: 'basket',
          handler: () => {
            this.router.navigate(['/banco-alimentos']);
          }
        });
      }

      // Cerrar sesión
      buttons.push({
        text: 'Cerrar Sesión',
        icon: 'log-out',
        handler: () => {
          this.logout();
        }
      });

      // Cancelar
      buttons.push({
        text: 'Cancelar',
        icon: 'close',
        handler: () => {
          this.dismissModal();
        }
      });

      return buttons;
    } else {
      return [
        {
          text: 'Iniciar Sesión',
          icon: 'log-in',
          handler: () => {
            this.presentLoginModal();
          }
        },
        {
          text: 'Registrarse',
          icon: 'person-add',
          handler: () => {
            this.presentRegisterOptions();
          }
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
          handler: function (): void {
            throw new Error('Function not implemented.');
          }
        }
      ];
    }
  }


  agregarBeneficiario() {
    if (this.beneficiarioForm.invalid) {
      Object.keys(this.beneficiarioForm.controls).forEach(key => {
        const control = this.beneficiarioForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
      return;
    }

    const beneficiario: BancoDeAlimentos = {
      nombre: this.beneficiarioForm.value.nombre,
      telefono: this.beneficiarioForm.value.telefono,
      email: this.beneficiarioForm.value.email,
      ciudad: this.beneficiarioForm.value.ciudadEmpresa,
      direccion: this.beneficiarioForm.value.direccion,
      contrasenia: this.beneficiarioForm.value.contrasenia
    };

    this.bancoAlimentoService.create(beneficiario).subscribe({
      next: (response: any) => {
        console.log('Respuesta:', response);
        this.presentToast('Beneficiario registrado exitosamente');
        this.beneficiarioForm.reset();
        this.modalController.dismiss();
      },
      error: (error: any) => {
        console.error('Error al registrar:', error);
        this.presentToast('Error al registrar el beneficiario. Por favor, inténtelo de nuevo.', 'danger');
      }
    });
  }

  registrarEmpresa() {
    if (this.empresaForm.invalid) {
      Object.keys(this.empresaForm.controls).forEach(key => {
        const control = this.empresaForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
      return;
    }

    const empresa: Empresa = {
      ...this.empresaForm.value,
      suscripcion: this.selectedPlan
    };

    this.empresaService.create(empresa).subscribe({
      next: (response: any) => {
        console.log('Empresa registrada:', response);
        this.presentToast('Empresa registrada exitosamente');
        this.empresaForm.reset();
        this.modalController.dismiss();
        this.router.navigate(['/pasarelaPago']);
      },
      error: (error: any) => {
        console.error('Error al registrar:', error);
        this.presentToast('Error al registrar la empresa. Por favor, inténtelo de nuevo.', 'danger');
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

  onLogin() {
    this.authService.login(this.loginData.email, this.loginData.password)
      .subscribe({
        next: (response: any) => {
          this.checkAuthStatus();
          this.navigateBasedOnRole(this.userRole);
          this.presentToast(`¡Bienvenido, ${this.userName}!`);
          this.modalController.dismiss({ loggedIn: true });
        },
        error: (error: any) => {
          console.error('Error de inicio de sesión', error);
          this.presentToast('Error al iniciar sesión. Compruebe sus credenciales.', 'danger');
        }
      });
  }

  logout() {
    const logoutName = this.userName || 'usuario';
    this.authService.logout();
    this.checkAuthStatus();
    this.presentToast(`¡Hasta luego, ${logoutName}!`);
    this.router.navigate(['/']);
  }

  private navigateBasedOnRole(role: string | null) {
    switch (role) {
      case 'EMPRESA':
        this.router.navigate(['/empresas-donacion']);
        break;
      case 'ADMIN':
        this.router.navigate(['/zonaAdmin']);
        break;
      case 'BANCO_DE_ALIMENTOS':
        this.router.navigate(['/banco-alimentos']);
        break;
      default:
        this.router.navigate(['/']);
    }
  }

  onSearch() {
    if (this.searchTerm.trim()) {
      this.router.navigate(['/search'], {
        queryParams: { q: this.searchTerm }
      });
    }
  }

  scrollToSection(sectionId: string) {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth'
    });
  }

  selectPlan(plan: string): void {
    this.selectedPlan = plan;
    this.subscriptionService.setPlan(plan);
    this.empresaForm.patchValue({ suscripcion: plan });
  }

  goToPayment(): void {
    if (this.empresaForm.invalid) {
      Object.keys(this.empresaForm.controls).forEach(key => {
        const control = this.empresaForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
      return;
    }
    this.registroDataService.setEmpresaData(this.empresaForm.value);
    this.router.navigate(['/pasarelaPago']);
  }

  dismissModal() {
    this.modalController.dismiss();
  }

  backToLogin() {
    this.presentLoginModal();
  }
}