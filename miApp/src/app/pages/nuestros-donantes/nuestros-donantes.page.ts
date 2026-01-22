import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GeocodingService } from '../../services/geocoding-service.service';
import { EmpresaService, RespuestaPaginada } from '../../services/empresaService/empresa.service';
import { Empresa } from '../../models/empresa.model';
import * as L from 'leaflet';
import { IonApp, IonButton, IonIcon, IonHeader, IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonFooter } from "@ionic/angular/standalone";

@Component({
  selector: 'app-nuestros-donantes',
  templateUrl: './nuestros-donantes.page.html',
  styleUrls: ['./nuestros-donantes.page.scss'],
  standalone: false
})
export class NuestrosDonantesPage implements OnInit {
  private map: L.Map | null = null;
  private markersMap: Map<string, L.Marker> = new Map();
  empresas: Empresa[] = [];
  paginaActual = 0;
  totalPaginas = 0;
  tamanoPagina = 9;
  isLoading = true;
  errorMessage: string | null = null;
  totalDonacionesPorEmpresa = new Map<number, number>();
  @ViewChild('mapSection') mapSection!: ElementRef;

  constructor(
    private geocodingService: GeocodingService,
    private empresaService: EmpresaService
  ) {
    console.log('Componente inicializado');
  }

  ngOnInit(): void {
    console.log('ngOnInit ejecutado');
    this.initMap();
    this.cargarEmpresas();
    this.cargarEmpresasPaginadas();
  }

  private initMap(): void {
    console.log('Inicializando mapa...');
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);

    setTimeout(() => {
      this.map = L.map('mapa', { scrollWheelZoom: false }).setView([0, 0], 2);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(this.map);

      this.map.on('mouseover', () => {
        this.map?.scrollWheelZoom.enable();
      });
      this.map.on('mouseout', () => {
        this.map?.scrollWheelZoom.disable();
      });

      console.log('Mapa inicializado');
    }, 100);
  }
 private cargarEmpresasPaginadas(): void {
    this.isLoading = true;
    this.errorMessage = null;
    
    console.log('Cargando bancos paginados...');
    this.empresaService.obtenerEmpresasPaginadas(this.paginaActual, this.tamanoPagina).subscribe({
      next: (respuesta: RespuestaPaginada<Empresa>) => {
        console.log('Bancos recibidos:', respuesta);
        this.empresas = respuesta.content;
        this.totalPaginas = respuesta.totalPages;
        
        // Limpiar marcadores existentes si hay un mapa
        if (this.map) {
          this.markersMap.forEach(marker => marker.remove());
          this.markersMap.clear();
          
          // Agregar marcadores para los nuevos bancos
          this.empresas.forEach(empresas => {
            this.agregarMarcador(empresas, false);
          });
        }
        
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar bancos paginados:', error);
        this.errorMessage = error.message || 'No se pudieron cargar los bancos. Verifica tu conexión.';
        this.isLoading = false;
      }
    });
  }
  private cargarEmpresas(): void {
    this.empresaService.getAll().subscribe({
      next: (empresas) => {
        this.empresas = empresas;
        empresas.forEach(empresa => {
          this.agregarMarcador(empresa, false);
          if (empresa.id) {
            this.cargarTotalDonacionesEmpresa(empresa.id);
          }
        });
      },
      error: (error) => {
        console.error('Error al cargar bancos de alimentos:', error);
      }
    });
  }
obtenerYMostrarUbicacion(empresa: Empresa): void {
    console.log('Ver en el mapa para:', empresa);
    if (!this.map) {
      console.error('El mapa no está inicializado');
      return;
    }
    
    const key = empresa.id ? empresa.id.toString() : empresa.nombre;
    if (this.markersMap.has(key)) {
      const marker = this.markersMap.get(key)!;
      const latlng = marker.getLatLng();
      this.map.setView(latlng, 15);
      this.scrollToMap();
    } else {
      this.agregarMarcador(empresa, true);
    }
  }

  private agregarMarcador(empresa: Empresa, centrar: boolean): void {
    if (!this.map) {
      console.error('El mapa no está inicializado');
      return;
    }
    
    const key = empresa.id ? empresa.id.toString() : empresa.nombre;
    this.geocodingService.obtenerCoordenadas(empresa.direccion, empresa.ciudad).subscribe({
      next: (coordenadas) => {
        if (coordenadas) {
          if (this.markersMap.has(key)) {
            if (centrar) {
              const marker = this.markersMap.get(key)!;
              this.map?.setView(marker.getLatLng(), 15);
              this.scrollToMap();
            }
            return;
          }
          
          const marker = L.marker([coordenadas.lat, coordenadas.lng])
            .addTo(this.map!)
            .bindPopup(`
              <div class="popup-content">
                <h6>${empresa.nombre}</h6>
                <p>Haz click para más información</p>
              </div>
            `)
            .openPopup();
            
          this.markersMap.set(key, marker);
          console.log('Marcador agregado para:', empresa);
          
          if (centrar) {
            setTimeout(() => {
              this.map?.setView([coordenadas.lat, coordenadas.lng], 15);
              this.scrollToMap();
            }, 300);
          }
        } else {
          console.error('No se pudieron obtener las coordenadas para:', empresa.nombre);
        }
      },
      error: (error) => {
        console.error('Error al obtener coordenadas:', error);
      }
    });
  }

  scrollToMap(): void {
    if (this.mapSection) {
      setTimeout(() => {
        this.mapSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
      });
    }
  }

  arrayDePaginas(): number[] {
    const paginasAMostrar = 5;
    const arrayPaginas: number[] = [];
    
    let inicio = Math.max(1, this.paginaActual - Math.floor(paginasAMostrar / 2));
    let fin = Math.min(this.totalPaginas, inicio + paginasAMostrar - 1);
    
    inicio = Math.max(1, fin - paginasAMostrar + 1);
    
    for (let i = inicio; i <= fin; i++) {
        arrayPaginas.push(i);
    }
    
    return arrayPaginas;
  }

  cambiarPagina(nuevaPagina: number): void {
    console.log('Cambiando a página:', nuevaPagina);
    this.paginaActual = nuevaPagina;
    this.cargarEmpresasPaginadas();
  }

  // Método para recargar datos manualmente
  recargarDatos(): void {
    console.log('Recargando datos...');
    this.cargarEmpresasPaginadas();
  }

  private cargarTotalDonacionesEmpresa(empresaId: number): void {
    this.empresaService.getTotalDonaciones(empresaId).subscribe({
      next: (total) => {
        this.totalDonacionesPorEmpresa.set(empresaId, total);
      },
      error: (error) => {
        console.error('Error al cargar total de donaciones:', error);
        this.totalDonacionesPorEmpresa.set(empresaId, 0);
      }
    });
  }

  TotalDonaciones(empresa: Empresa): number {
    if (!empresa.id) return 0;
    return this.totalDonacionesPorEmpresa.get(empresa.id) || 0;
  }
}