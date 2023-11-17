import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DosProfesorPage } from './dos.profesor.page';

const routes: Routes = [
  {
    path: '',
    component: DosProfesorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DosProfesorPageRoutingModule {}
