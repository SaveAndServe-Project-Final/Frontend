import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/autentificacion/auth.service';
import { BancoalimentosService } from 'src/app/services/bancoAlimentoService/bancoalimentos.service';
import { DonacionService } from 'src/app/services/donacionService/donacion.service';

@Component({
  selector: 'app-perfil-beneficiario',
  templateUrl: './perfil-beneficiario.page.html',
  styleUrls: ['./perfil-beneficiario.page.scss'],
  standalone:false
})
export class PerfilBeneficiarioPage implements OnInit {


 banco: any = {};
   editing: {[key: string]: boolean} = {};
   editedFields: { [key: string]: string } = {};
   hasChanges: boolean = false;
   bancos: any[] = [];
   transportes: any[] = [];
   alergenos: any[] = [];
   totalDonacion: number = 0;
   loadingBancos: boolean = false;
   loadingTransportes: boolean = false;
   loadingAlergenos: boolean = false;
   errorBancos: string | null = null;
   errorTransportes: string | null = null;
   errorAlergenos: string | null = null;
   loadingDonaciones: boolean = false;
  
  beneficiarioForm!: FormGroup;
 
   constructor(
     private bancoService: BancoalimentosService,
     private donacionService: DonacionService,
     private authService: AuthService,
     private fb: FormBuilder
   ) {
     this.initForm();
   }
 
   private initForm() {
     this.beneficiarioForm = this.fb.group({
     bancoDeAlimentosId: [{value: '', disabled: true}, Validators.required],
      
     });
   }
 
  
 
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
   ngOnInit() {
    this.loadBancos();
     this.ciudades.sort((a, b) => a.localeCompare(b));
   }
    cancelEdit(field: string) {
    this.editing[field] = false;
    this.banco[field] = this.editedFields[field];
    delete this.editedFields[field];
    if (Object.keys(this.editedFields).length === 0) {
      this.hasChanges = false;
    }
  }
   startEditing(field: string) {
    this.editing[field] = true;
    this.editedFields[field] = this.banco[field];
    this.hasChanges = true;
  }
  saveChanges() {
    // Crear un objeto con solo los campos editados
    const bancoActualizada = {
        id: this.banco.id,
        nombre: this.banco.nombre,
        email: this.banco.email,
        direccion: this.banco.direccion,
        telefono: this.banco.telefono,
        ciudad: this.banco.ciudad,
    };

    this.bancoService.updateBancoAlimentos(this.banco.id, bancoActualizada).subscribe({
        next: (updatedbanco) => {
            this.banco = updatedbanco;
            this.hasChanges = false;
            Object.keys(this.editing).forEach(key => {
                this.editing[key] = false;
            });
            this.editedFields = {};
            alert('Cambios guardados correctamente');
        },
        error: (error) => {
            console.error('Error al actualizar la banco:', error);
            alert('Error al guardar los cambios: ' + 
                  (error.error?.message || 'No se pudieron guardar los cambios'));
        }
    });
}
 loadBancos() {
    const userEmail = this.authService.getUserName();
    if (userEmail) {
      this.bancoService.getBancoAlimentosByEmail(userEmail).subscribe({
        next: (empresaData) => {
          this.banco = empresaData;
          this.beneficiarioForm.patchValue({
            empresaId: empresaData.id
          });
        },
        error: (error) => {
          console.error('Error al cargar la empresa:', error);
          alert('Error al cargar la información de la empresa');
        }
      });
    }
  }

}
