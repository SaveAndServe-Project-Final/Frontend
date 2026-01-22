import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/services/autentificacion/auth.service';
import { DonacionService } from 'src/app/services/donacionService/donacion.service';
import { EmpresaService } from 'src/app/services/empresaService/empresa.service';

@Component({
  selector: 'app-tabla-donaciones',
  templateUrl: './tabla-donaciones.component.html',
  styleUrls: ['./tabla-donaciones.component.scss'],
  standalone:true,
  imports:[
    CommonModule,
    IonicModule
  ]
})
export class TablaDonacionesComponent  implements OnInit {

  donaciones: any[] = [];
  empresa: any = {};
  loadingDonaciones = false;
  errorDonaciones: string | null = null;
  selectedDonacion: any = null;

  constructor(
    private donacionService: DonacionService,
    private empresaService: EmpresaService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadCurrentEmpresa();
    this.donacionService.donacionActualizada$.subscribe(() => {
    if (this.empresa?.id) {
      this.loadDonacionesEmpresa(this.empresa.id);
    }
  });
  }

  loadCurrentEmpresa() {
    const userDataStr = localStorage.getItem('userData');
    if (!userDataStr) return;

    try {
      const userData = JSON.parse(userDataStr);
      if (!userData?.email) return;

      this.empresaService.getEmpresaByEmail(userData.email).subscribe({
        next: (data) => {
          if (data?.id) {
            this.empresa = data;
            this.loadDonacionesEmpresa(data.id);
          }
        },
        error: (err) => {
          console.error(err);
          this.errorDonaciones = 'Error al cargar información de la empresa';
        }
      });
    } catch (error) {
      console.error('Error al procesar datos de usuario:', error);
    }
  }

  loadDonacionesEmpresa(empresaId: number) {
    this.loadingDonaciones = true;
    this.errorDonaciones = null;

    this.donacionService.getDonacionesByEmpresa(empresaId).subscribe({
      next: (data) => {
        this.donaciones = Array.isArray(data) ? data : [];
        this.loadingDonaciones = false;
      },
      error: (error) => {
        console.error('Error al cargar donaciones:', error);
        this.errorDonaciones = 'No se pudieron cargar las donaciones';
        this.loadingDonaciones = false;
      }
    });
  }

  verDetalleDonacion(donacion: any) {
    this.selectedDonacion = donacion;
  }

  cerrarDetalleDonacion() {
    this.selectedDonacion = null;
  }

  getBadgeColor(estado: string): string {
    switch (estado) {
      case 'PENDIENTE': return 'warning';
      case 'ENVIADO': return 'success';
      case 'ENTREGADO': return 'danger';
      default: return 'medium';
    }
  }

}
