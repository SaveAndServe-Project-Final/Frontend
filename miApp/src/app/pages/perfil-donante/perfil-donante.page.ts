import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/autentificacion/auth.service';
import { DonacionService } from 'src/app/services/donacionService/donacion.service';
import { EmpresaService } from 'src/app/services/empresaService/empresa.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-perfil-donante',
  templateUrl: './perfil-donante.page.html',
  styleUrls: ['./perfil-donante.page.scss'],
  standalone:false,
  
})
export class PerfilDonantePage implements OnInit {

 empresa: any = {};
   editing: {[key: string]: boolean} = {};
   editedFields: { [key: string]: string } = {};
   hasChanges: boolean = false;
   bancos: any[] = [];
   transportes: any[] = [];
   alergenos: any[] = [];
   donacionForm!: FormGroup;
   totalDonacion: number = 0;
   loadingBancos: boolean = false;
   loadingTransportes: boolean = false;
   loadingAlergenos: boolean = false;
   errorBancos: string | null = null;
   errorTransportes: string | null = null;
   errorAlergenos: string | null = null;
   loadingDonaciones: boolean = false;
   donaciones: any[] = [];
   errorDonaciones: string | null = null;
 
   constructor(
     private empresaService: EmpresaService,
     private donacionService: DonacionService,
     private authService: AuthService,
     private fb: FormBuilder
   ) {
     this.initForm();
   }
 
   private initForm() {
     this.donacionForm = this.fb.group({
     empresaId: [{value: '', disabled: true}, Validators.required],
       bancoDeAlimentosId: ['', Validators.required],
       transporteId: ['', Validators.required],
       fechaEntrega: ['', Validators.required],
       lineasProducto: this.fb.array([]),
       totalDonacion: [0]
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
    this.loadLoggedInEmpresa();
     this.ciudades.sort((a, b) => a.localeCompare(b));
   }
    cancelEdit(field: string) {
    this.editing[field] = false;
    this.empresa[field] = this.editedFields[field];
    delete this.editedFields[field];
    if (Object.keys(this.editedFields).length === 0) {
      this.hasChanges = false;
    }
  }
   startEditing(field: string) {
    this.editing[field] = true;
    this.editedFields[field] = this.empresa[field];
    this.hasChanges = true;
  }
  saveChanges() {
    // Crear un objeto con solo los campos editados
    const empresaActualizada = {
        id: this.empresa.id,
        nombre: this.empresa.nombre,
        email: this.empresa.email,
        direccion: this.empresa.direccion,
        telefono: this.empresa.telefono,
        cif: this.empresa.cif,
        ciudad: this.empresa.ciudad,
        suscripcion: this.empresa.suscripcion
    };

    this.empresaService.updateEmpresa(this.empresa.id, empresaActualizada).subscribe({
        next: (updatedEmpresa) => {
            this.empresa = updatedEmpresa;
            this.hasChanges = false;
            Object.keys(this.editing).forEach(key => {
                this.editing[key] = false;
            });
            this.editedFields = {};
            alert('Cambios guardados correctamente');
        },
        error: (error) => {
            console.error('Error al actualizar la empresa:', error);
            alert('Error al guardar los cambios: ' + 
                  (error.error?.message || 'No se pudieron guardar los cambios'));
        }
    });
}
  loadLoggedInEmpresa() {
    const userEmail = this.authService.getUserName();
    if (userEmail) {
      this.empresaService.getEmpresaByEmail(userEmail).subscribe({
        next: (empresaData) => {
          this.empresa = empresaData;
          this.donacionForm.patchValue({
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
