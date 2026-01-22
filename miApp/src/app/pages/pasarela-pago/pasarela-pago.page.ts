import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SuscripcionService } from '../../services/suscripcionService/suscripcion.service';
import { RegistroDataService } from '../../services/registrodata/registro-data.service';
import { Router } from '@angular/router';
import { EmpresaService } from '../../services/empresaService/empresa.service';
import { IonAccordionGroup, NavController } from '@ionic/angular';

@Component({
  selector: 'app-pasarela-pago',
  templateUrl: './pasarela-pago.page.html',
  styleUrls: ['./pasarela-pago.page.scss'],
  standalone: false

})
export class PasarelaPagoPage implements OnInit {
  plan: string = 'Premium';
  price: number = 0;
  cardNumber: string = '';
  expiryDate: string = '';
  cvv: string = '';
  paypalEmail: string = '';

  showCardNumberError = false;
  showExpiryError = false;
  showCvvError = false;
  showPaypalError = false;

  constructor(
    private subscriptionService: SuscripcionService,
    private registroDataService: RegistroDataService,
    private empresaService: EmpresaService,
    private router: Router,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    const empresa = this.registroDataService.getEmpresaData();

    if (empresa) {
      this.plan = empresa.suscripcion ?? 'Premium';
      this.price = this.subscriptionService.getPrice();
    }
  }

  formatExpiry(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    this.expiryDate = value;
  }

  onNumericInput(event: any) {
    const fieldName = event.target.name as 'cardNumber' | 'cvv';
    if (fieldName && typeof this[fieldName] === 'string') {
      this[fieldName] = event.target.value.replace(/\D/g, '');
    }
  }

  validateCreditCard(): boolean {
    this.showCardNumberError = !/^\d{16}$/.test(this.cardNumber);
    this.showExpiryError = !/^(0[1-9]|1[0-2])\/\d{2}$/.test(this.expiryDate);
    this.showCvvError = !/^\d{3,4}$/.test(this.cvv);
    return !(this.showCardNumberError || this.showExpiryError || this.showCvvError);
  }

  validatePaypal(): boolean {
    this.showPaypalError = !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.paypalEmail);
    return !this.showPaypalError;
  }

  onPay() {
    const active = (document.querySelector('ion-accordion[expanded]') as any)?.value;
    if (active === 'paypal') {
      if (!this.validatePaypal()) return;
      alert('Pago realizado con éxito (Paypal)');
    } else {
      if (!this.validateCreditCard()) return;
      alert('Pago realizado con éxito (Tarjeta de crédito)');
    }
    this.processRegistration();
     this.navCtrl.back();
  }

  processRegistration() {
    const empresaData = this.registroDataService.getEmpresaData();
    if (!empresaData) {
      alert('No se encontraron datos de registro. Completa el formulario nuevamente.');
      this.router.navigate(['/']);
      return;
    }
    this.empresaService.create(empresaData).subscribe({
      next: () => {
        alert('Empresa registrada y pago realizado exitosamente');
        this.registroDataService.clearEmpresaData();
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Error al registrar la empresa:', error);
        alert('Error al registrar la empresa. Por favor, inténtelo de nuevo.');
      }
    });
  }
}

