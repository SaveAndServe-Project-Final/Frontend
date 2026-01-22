import { Component, AfterViewInit, ElementRef, ViewChild, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { GeocodingService } from '../../services/geocoding-service.service';
import { BancoDeAlimentos } from 'src/app/models/bancoAlimentos.model';
import { BancoalimentosService } from 'src/app/services/bancoAlimentoService/bancoalimentos.service';
import { RespuestaPaginada } from 'src/app/services/empresaService/empresa.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-nuestros-beneficiarios',
  templateUrl: './nuestros-beneficiarios.page.html',
  styleUrls: ['./nuestros-beneficiarios.page.scss'],
  standalone: false
})
export class NuestrosBeneficiariosPage implements OnInit, AfterViewInit {
  private map: L.Map | null = null;
  private markersMap: Map<string, L.Marker> = new Map();
  bancos: BancoDeAlimentos[] = [];
  paginaActual = 0;
  totalPaginas = 0;
  tamanoPagina = 9;
  isLoading = true;
  errorMessage: string | null = null;

  @ViewChild('mapSection') mapSection!: ElementRef;

  constructor(
    private geocodingService: GeocodingService,
    private bancoService: BancoalimentosService,
    private platform: Platform
  ) {
    console.log('Constructor de NuestrosBeneficiariospage iniciado');
  }

  ngOnInit(): void {
    console.log('ngOnInit ejecutado');
    this.platform.ready().then(() => {
      console.log('Plataforma Ionic lista');
      this.cargarBancosPaginadas();
    });
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit ejecutado');
    setTimeout(() => {
      this.initMap();
    }, 500);
  }

  private initMap(): void {
    console.log('Inicializando mapa...');
    try {
      if (!document.getElementById('mapa')) {
        console.error('Elemento con id "mapa" no encontrado');
        return;
      }

      // Asegúrate de que las hojas de estilo de Leaflet estén cargadas
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);

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

      console.log('Mapa inicializado correctamente');
    } catch (error) {
      console.error('Error al inicializar el mapa:', error);
    }
  }

  private cargarBancosPaginadas(): void {
    this.isLoading = true;
    this.errorMessage = null;
    
    console.log('Cargando bancos paginados...');
    this.bancoService.obtenerBancosPaginadas(this.paginaActual, this.tamanoPagina).subscribe({
      next: (respuesta: RespuestaPaginada<BancoDeAlimentos>) => {
        console.log('Bancos recibidos:', respuesta);
        this.bancos = respuesta.content;
        this.totalPaginas = respuesta.totalPages;
        
        // Limpiar marcadores existentes si hay un mapa
        if (this.map) {
          this.markersMap.forEach(marker => marker.remove());
          this.markersMap.clear();
          
          // Agregar marcadores para los nuevos bancos
          this.bancos.forEach(banco => {
            this.agregarMarcador(banco, false);
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

  obtenerYMostrarUbicacion(banco: BancoDeAlimentos): void {
    console.log('Ver en el mapa para:', banco);
    if (!this.map) {
      console.error('El mapa no está inicializado');
      return;
    }
    
    const key = banco.id ? banco.id.toString() : banco.nombre;
    if (this.markersMap.has(key)) {
      const marker = this.markersMap.get(key)!;
      const latlng = marker.getLatLng();
      this.map.setView(latlng, 15);
      this.scrollToMap();
    } else {
      this.agregarMarcador(banco, true);
    }
  }

  private agregarMarcador(banco: BancoDeAlimentos, centrar: boolean): void {
    if (!this.map) {
      console.error('El mapa no está inicializado');
      return;
    }
    
    const key = banco.id ? banco.id.toString() : banco.nombre;
    this.geocodingService.obtenerCoordenadas(banco.direccion, banco.ciudad).subscribe({
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
                <h6>${banco.nombre}</h6>
                <p>Haz click para más información</p>
              </div>
            `)
            .openPopup();
            
          this.markersMap.set(key, marker);
          console.log('Marcador agregado para:', banco);
          
          if (centrar) {
            setTimeout(() => {
              this.map?.setView([coordenadas.lat, coordenadas.lng], 15);
              this.scrollToMap();
            }, 300);
          }
        } else {
          console.error('No se pudieron obtener las coordenadas para:', banco.nombre);
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
    this.cargarBancosPaginadas();
  }

  // Método para recargar datos manualmente
  recargarDatos(): void {
    console.log('Recargando datos...');
    this.cargarBancosPaginadas();
  }
}