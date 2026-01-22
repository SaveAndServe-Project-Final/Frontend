import { Component, OnInit } from '@angular/core';
import { Articulo } from 'src/app/models/articulo.model';
import { ArticuloService } from 'src/app/services/articuloService/articulo.service';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.page.html',
  styleUrls: ['./articulos.page.scss'],
  standalone:false
})
export class ArticulosPage implements OnInit {

  articulos: Articulo[] = [];

  constructor(private articuloService: ArticuloService) { }

  ngOnInit(): void {
    this.articuloService.obtenerArticulos().subscribe({
      next: (data: Articulo[]) => {
        console.log('Artículos recibidos:', data);
        this.articulos = data;
      },
      error: (error) => console.error('Error al cargar artículos:', error)
    });
  }

  getImagenUrl(imagen: string): string {
    if (!imagen) {
      return 'assets/img/default.jpg';
    }
    if (/^(https?:\/\/|assets\/|data:image)/.test(imagen)) {
      return imagen;
    }
    return `http://localhost:9000${imagen}`;
  }
}
