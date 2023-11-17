import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfeQRPageRoutingModule } from './profe-qr-routing.module';

import { ProfeQRPage } from './profe-qr.page';

import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  imports: [
    QRCodeModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ProfeQRPageRoutingModule
  ],
  declarations: [ProfeQRPage]
})
export class ProfeQRPageModule {}
