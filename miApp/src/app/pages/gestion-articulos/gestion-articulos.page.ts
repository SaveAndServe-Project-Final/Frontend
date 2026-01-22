import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Articulo } from 'src/app/models/articulo.model';
import { ArticuloService } from 'src/app/services/articuloService/articulo.service';

@Component({
  selector: 'app-gestion-articulos',
  templateUrl: './gestion-articulos.page.html',
  styleUrls: ['./gestion-articulos.page.scss'],
  standalone: false
})
export class GestionArticulosPage implements OnInit {

 
   articuloForm!: FormGroup;
   imagenSeleccionada: File | null = null;
   articulos: Articulo[] = [];
   modoEdicion = false;
   articuloIdEditando: number | null = null;
   imagenPrevia: string | null = null;
 
   constructor(
     private fb: FormBuilder,
     private articuloService: ArticuloService,
     private toastController: ToastController
   ) {
     this.articuloForm = this.fb.group({
       titulo: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
       subtitulo: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
       contenido: ['', [Validators.required, Validators.minLength(20)]],
       imagen: [null, Validators.required]
     });
   }
 
   ngOnInit(): void {
     this.cargarArticulos();
   }
 
   cargarArticulos() {
     this.articuloService.getAll().subscribe({
       next: (data) => {
         this.articulos = data;
       },
       error: async () => {
         await this.presentToast('Error al cargar los artículos', 'danger');
       }
     });
   }
 
   getImagenUrl(imagen: string): string {
     if (!imagen) {
       return 'assets/img/default.jpg'; 
     }
   
     if (imagen.startsWith('http') || imagen.startsWith('assets') || imagen.startsWith('data:image')) {
       return imagen;
     }
   
     return `http://localhost:9000${imagen}`;
   }
 
   onImagenSeleccionada(event: any): void {
     const file = event.target.files[0];
     if (file) {
       this.imagenSeleccionada = file;
       this.articuloForm.patchValue({
         imagen: file
       });
       this.articuloForm.get('imagen')?.markAsTouched();
       this.imagenPrevia = URL.createObjectURL(file);
     }
   }
 
   async guardarArticulo(): Promise<void> {
     if (this.articuloForm.valid && (this.imagenSeleccionada || this.modoEdicion)) {
       let base64 = '';
 
       if (this.imagenSeleccionada) {
         base64 = await this.convertirImagenABase64(this.imagenSeleccionada);
       } else if (this.modoEdicion && this.imagenPrevia) {
         base64 = this.imagenPrevia;
       }
 
       const articulo: Articulo = {
         titulo: this.articuloForm.get('titulo')?.value,
         subtitulo: this.articuloForm.get('subtitulo')?.value,
         contenido: this.articuloForm.get('contenido')?.value,
         imagen: base64 || this.articuloForm.get('imagen')?.value
       };
 
       if (this.modoEdicion && this.articuloIdEditando) {
         articulo.idArticulo = this.articuloIdEditando;
         this.articuloService.update(this.articuloIdEditando, articulo).subscribe({
           next: async () => {
             await this.presentToast('Artículo actualizado correctamente', 'success');
             this.resetForm();
             this.cargarArticulos();
           },
           error: async () => {
             await this.presentToast('Error al actualizar el artículo', 'danger');
           }
         });
       } else {
         this.articuloService.create(articulo).subscribe({
           next: async () => {
             await this.presentToast('Artículo guardado correctamente', 'success');
             this.resetForm();
             this.cargarArticulos();
           },
           error: async () => {
             await this.presentToast('Error al guardar el artículo', 'danger');
           }
         });
       }
     }
   }
 
   resetForm() {
     this.articuloForm.reset();
     this.imagenSeleccionada = null;
     this.modoEdicion = false;
     this.articuloIdEditando = null;
   }
 
   async editarArticulo(articulo: Articulo) {
     this.modoEdicion = true;
     this.articuloIdEditando = articulo.idArticulo!;
     this.imagenPrevia = articulo.imagen;
 
     this.articuloForm.patchValue({
       titulo: articulo.titulo,
       subtitulo: articulo.subtitulo,
       contenido: articulo.contenido,
       imagen: null
     });
 
     this.articuloForm.get('imagen')?.clearValidators();
     this.articuloForm.get('imagen')?.updateValueAndValidity();
 
     this.imagenSeleccionada = null;
 
     // Scroll to top natively in Ionic
     window.scrollTo({ top: 0, behavior: 'smooth' });
   }
 
   async eliminarArticulo(id: number) {
     const confirmacion = confirm('¿Estás seguro de que deseas eliminar este artículo?');
     if (confirmacion) {
       this.articuloService.delete(id).subscribe({
         next: async () => {
           await this.presentToast('Artículo eliminado correctamente', 'success');
           this.cargarArticulos();
         },
         error: async () => {
           await this.presentToast('Error al eliminar el artículo', 'danger');
         }
       });
     }
   }
 
   private convertirImagenABase64(file: File): Promise<string> {
     return new Promise((resolve, reject) => {
       const reader = new FileReader();
       reader.readAsDataURL(file);
       reader.onload = () => resolve(reader.result as string);
       reader.onerror = error => reject(error);
     });
   }
 
   private async presentToast(message: string, color: 'success' | 'danger' | 'medium' = 'medium') {
     const toast = await this.toastController.create({
       message,
       duration: 3000,
       color,
       position: 'bottom'
     });
     toast.present();
   }

}
