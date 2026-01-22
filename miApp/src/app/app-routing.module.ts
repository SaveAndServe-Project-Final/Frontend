import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'suscripciones',
    loadChildren: () => import('./pages/suscripciones/suscripciones.module').then( m => m.SuscripcionesPageModule)
  },
  {
    path: 'nuestros-donantes',
    loadChildren: () => import('./pages/nuestros-donantes/nuestros-donantes.module').then( m => m.NuestrosDonantesPageModule)
  },
  {
    path: 'nuestros-beneficiarios',
    loadChildren: () => import('./pages/nuestros-beneficiarios/nuestros-beneficiarios.module').then( m => m.NuestrosBeneficiariosPageModule)
  },
  {
    path: 'articulos',
    loadChildren: () => import('./pages/articulos/articulos.module').then( m => m.ArticulosPageModule)
  },
  {
    path: 'detalle-articulo/:idArticulo',
    loadChildren: () => import('./pages/detalle-articulo/detalle-articulo.module').then( m => m.DetalleArticuloPageModule)
  },
  {
  path: 'registro-donante',
    loadChildren: () =>
      import('./components/registro-donante/registro-donante.module')
        .then(m => m.RegistroDonanteModule)
  },
  {
    path: 'pasarela-pago',
    loadChildren: () => import('./pages/pasarela-pago/pasarela-pago.module').then( m => m.PasarelaPagoPageModule)
  },
  {
    path: 'donaciones',
    loadChildren: () => import('./pages/donaciones/donaciones.module').then( m => m.DonacionesPageModule)
  },
  
  {
    path: 'perfil-donante',
    loadChildren: () => import('./pages/perfil-donante/perfil-donante.module').then( m => m.PerfilDonantePageModule)
  },
  {
    path: 'perfil-beneficiario',
    loadChildren: () => import('./pages/perfil-beneficiario/perfil-beneficiario.module').then( m => m.PerfilBeneficiarioPageModule)
  },
 
  {
    path: 'administracion',
    loadChildren: () => import('./pages/administracion/administracion.module').then( m => m.AdministracionPageModule)
  },
  {
    path: 'gestion-articulos',
    loadChildren: () => import('./pages/gestion-articulos/gestion-articulos.module').then( m => m.GestionArticulosPageModule)
  },  {
    path: 'gestion-beneficiarios',
    loadChildren: () => import('./pages/gestion-beneficiarios/gestion-beneficiarios.module').then( m => m.GestionBeneficiariosPageModule)
  },
  {
    path: 'gestion-donantes',
    loadChildren: () => import('./pages/gestion-donantes/gestion-donantes.module').then( m => m.GestionDonantesPageModule)
  }







];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
