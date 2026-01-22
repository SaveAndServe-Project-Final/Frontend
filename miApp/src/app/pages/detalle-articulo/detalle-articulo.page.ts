import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticuloService } from '../../services/articuloService/articulo.service';
import { Articulo } from '../../models/articulo.model';

@Component({
  selector: 'app-detalle-articulo',
  templateUrl: './detalle-articulo.page.html',
  styleUrls: ['./detalle-articulo.page.scss'],
  standalone: false
})
export class DetalleArticuloPage implements OnInit {
  articulo: Articulo | undefined;

  constructor(
    private route: ActivatedRoute,
    private articuloService: ArticuloService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['idArticulo'];
      if (id) {
        this.articuloService.obtenerArticuloPorId(+id).subscribe(
          (data) => {
            this.articulo = data;
          },
          (error) => console.error('Error al obtener el artículo', error)
        );
      }
    });
  }

  getImagenUrl(imagen: string): string {
    if (!imagen) {
      return 'assets/img/default.jpg';
    }
    if (
      imagen.startsWith('http') ||
      imagen.startsWith('assets') ||
      imagen.startsWith('data:image')
    ) {
      return imagen;
    }
    return `http://localhost:9000${imagen}`;
  }

  // Método mejorado para formatear el contenido
  getFormattedContent(): string[] {
    if (!this.articulo?.contenido) {
      return [];
    }

    // Dividir por saltos de línea y filtrar párrafos vacíos
    return this.articulo.contenido
      .split('\n')
      .map(paragraph => paragraph.trim())
      .filter(paragraph => paragraph.length > 0);
  }
}