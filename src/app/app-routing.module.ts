import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },


  {
    path: 'inicio',
    loadChildren: () => import('./inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'dos',
    loadChildren: () => import('./dos/dos.module').then( m => m.DosPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'dos.profesor',
    loadChildren: () => import('./dos.profesor/dos.profesor.module').then( m => m.DosProfesorPageModule)
  },
  {
    path: 'profe-qr',
    loadChildren: () => import('./profe-qr/profe-qr.module').then( m => m.ProfeQRPageModule)
  },
  {
    path: 'detalle-asignatura',
    loadChildren: () => import('./detalle-asignatura/detalle-asignatura.module').then( m => m.DetalleAsignaturaPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
