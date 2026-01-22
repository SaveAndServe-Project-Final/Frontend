import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { BancoDeAlimentos } from 'src/app/models/bancoAlimentos.model';
import { BancoalimentosService } from 'src/app/services/bancoAlimentoService/bancoalimentos.service';

@Component({
  selector: 'app-gestion-beneficiarios',
  templateUrl: './gestion-beneficiarios.page.html',
  styleUrls: ['./gestion-beneficiarios.page.scss'],
  standalone: false
})
export class GestionBeneficiariosPage implements OnInit {
  modoEdicion = false;
  mensaje: string = '';
  beneficiarios: BancoDeAlimentos[] = [];
  beneficiarioForm: FormGroup;
  beneficiarioIdEdicion?: number;

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
    'Algeciras', 'San Sebastián de los Reyes', 'Sant Cugat del Vallès', 'Torrejón de Ardoz',
    'Pontevedra', 'Segovia', 'Soria', 'Cuenca', 'Teruel',
    'Huesca', 'Ciudad Real', 'Zamora'
  ];

  constructor(
    private bancoAlimentoService: BancoalimentosService,
    private fb: FormBuilder,
    private toastController: ToastController
  ) {
    this.beneficiarioForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{9,15}$/)]],
      direccion: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      ciudad: ['', Validators.required],
      documentacionValidada: [false],
      contrasenia: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    this.cargarBeneficiarios();
    this.ciudades.sort((a, b) => a.localeCompare(b));
  }

  cargarBeneficiarios() {
    this.bancoAlimentoService.getAll().subscribe((data) => {
      const validados = JSON.parse(localStorage.getItem('beneficiariosValidados') || '{}');

      this.beneficiarios = data.map((beneficiario: any) => ({
        ...beneficiario,
        documentacionValidada: validados[beneficiario.id] === true,
      }));
    });
  }

  async agregarBeneficiario() {
    if (this.beneficiarioForm.invalid) return;

    const beneficiarioParaEnviar = { ...this.beneficiarioForm.value };

    if (this.modoEdicion && this.beneficiarioIdEdicion) {
      this.bancoAlimentoService.update(this.beneficiarioIdEdicion, beneficiarioParaEnviar).subscribe(async () => {
        this.cargarBeneficiarios();
        this.limpiarFormulario();
        this.modoEdicion = false;
        await this.mostrarToast('Modificación realizada con éxito');
      });
    } else {
      this.bancoAlimentoService.create(beneficiarioParaEnviar).subscribe(async () => {
        this.cargarBeneficiarios();
        this.limpiarFormulario();
        await this.mostrarToast('Beneficiario agregado con éxito');
      });
    }
  }

  limpiarFormulario() {
    this.beneficiarioForm.reset({
      nombre: '',
      telefono: '',
      direccion: '',
      email: '',
      ciudad: '',
      documentacionValidada: false,
      contrasenia: '',
    });
    this.beneficiarioIdEdicion = undefined;
    this.modoEdicion = false;
  }

  esValidada(beneficiario: any): boolean {
    return beneficiario.documentacionValidada === true;
  }

  toggleValidacion(beneficiario: any) {
    beneficiario.documentacionValidada = !beneficiario.documentacionValidada;

    let validados = JSON.parse(localStorage.getItem('beneficiariosValidados') || '{}');
    if (beneficiario.documentacionValidada) {
      validados[beneficiario.id] = true;
    } else {
      delete validados[beneficiario.id];
    }

    localStorage.setItem('beneficiariosValidados', JSON.stringify(validados));
  }

  eliminarBeneficiario(id: number) {
    this.bancoAlimentoService.delete(id).subscribe(() => {
      this.cargarBeneficiarios();
    });
  }

  editarBeneficiario(beneficiario: BancoDeAlimentos) {
    this.beneficiarioIdEdicion = beneficiario.id;
    this.modoEdicion = true;

    this.beneficiarioForm.patchValue({
      nombre: beneficiario.nombre,
      telefono: beneficiario.telefono,
      direccion: beneficiario.direccion,
      email: beneficiario.email,
      ciudad: beneficiario.ciudad,
      documentacionValidada: beneficiario.documentacionValidada,
      contrasenia: null,
    });

    // Quitar validación temporalmente si ya existe y no se cambia
    this.beneficiarioForm.get('contrasenia')?.clearValidators();
    this.beneficiarioForm.get('contrasenia')?.updateValueAndValidity();
  }

  async mostrarToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000,
      color: 'success',
      position: 'bottom',
    });
    await toast.present();
  }
}