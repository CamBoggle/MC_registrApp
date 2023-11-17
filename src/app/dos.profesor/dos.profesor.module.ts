import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DosProfesorPageRoutingModule } from './dos.profesor-routing.module';

import { DosProfesorPage } from './dos.profesor.page';

//IMPORTAMOS QR
import { QRCodeModule } from 'angularx-qrcode';


@NgModule({
  imports: [
    QRCodeModule,
    CommonModule,
    FormsModule,
    IonicModule,
    DosProfesorPageRoutingModule
  ],
  declarations: [DosProfesorPage]
})
export class DosProfesorPageModule {}
