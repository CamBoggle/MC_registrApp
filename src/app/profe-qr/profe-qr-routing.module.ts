import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfeQRPage } from './profe-qr.page';

const routes: Routes = [
  {
    path: '',
    component: ProfeQRPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfeQRPageRoutingModule {}
