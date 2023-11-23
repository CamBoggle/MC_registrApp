import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiLoginService } from '../inicio/api-login.service';
import { Storage } from '@ionic/storage-angular';
import { CrudStorageService } from '../inicio/crud-storage.service';
import { AlertController, ToastController } from '@ionic/angular';
//IMPORT PARA CAMARA
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-dos',
  templateUrl: './dos.page.html',
  styleUrls: ['./dos.page.scss'],
})
export class DosPage implements OnInit {

 
  horarios: any = [];
  usuarioData: any = [];
  clasesUsuario: any = []
  clasesDetalles: any = [];
  lectorQR?: string;


  constructor(
    private api: ApiLoginService,
    private router: Router,
    private storage: Storage,
    private crud: CrudStorageService,
    private changeDetectorRef: ChangeDetectorRef,
    private alertcontroller: AlertController) { }

    async startScan() {
      document.body.classList.add('barcode-scanner-active');
      const listener = await BarcodeScanner.addListener('barcodeScanned', async (result) => {
        if (result.barcode.displayValue) {
          this.lectorQR = result.barcode.displayValue;
          this.api.alumnoPresente(this.lectorQR,this.usuarioData.user);
          this.stopScan(); 
        }
      });
      await BarcodeScanner.startScan();
    }


  
    async stopScan() {
      document.body.classList.remove('barcode-scanner-active');
      await BarcodeScanner.removeAllListeners();
      await BarcodeScanner.stopScan();
      this.changeDetectorRef.detectChanges();
    }



    prueba(){
      this.api.alumnoPresente("49ff5c06-bd41-4cac-a62a-32c371ce352b", "111111111-1")
    }


  ngOnInit() {
   this.cargarDatosUsuario();
  }

  async cargarDatosUsuario() {
    const usuario = await this.storage.get('currentUser');
    if (usuario) {
      this.usuarioData = usuario;
      this.clasesUsuario = usuario.clases_inscrita; // Asegúrate de actualizar clasesUsuario aquí también
      await this.cargarDetallesClases();
    } else {
      console.log('No se encontraron datos del usuario');
      // Manejar la situación cuando no hay datos del usuario
    }
  }

  async cargarDetallesClases() {
    for (const idClase of this.clasesUsuario) {
      const detallesClase = await this.api.obtenerAsignatura(idClase);
      if (detallesClase) {
        this.clasesDetalles.push(detallesClase);
      }
    }
  }
  cerrarSesion(){
    this.crud.clearCurrentUser()
    this.router.navigate(['/inicio']);
  }


  async alertaAsistencia() {
    const alert = await this.alertcontroller.create({
      header: 'La asistencia ya fue pasada',
      message: 'No puede registrarse',
      buttons: ['ok'],
    });

    await alert.present();
  }
}
