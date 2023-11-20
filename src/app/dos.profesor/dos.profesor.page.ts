import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiLoginService } from '../inicio/api-login.service';
import { Storage } from '@ionic/storage-angular';
import { CrudStorageService } from '../inicio/crud-storage.service';

@Component({
  selector: 'app-dos.profesor',
  templateUrl: './dos.profesor.page.html',
  styleUrls: ['./dos.profesor.page.scss'],
})
export class DosProfesorPage implements OnInit {

  horarios: any = [];
  usuarioData: any = [];
  clasesUsuario: any = []
  clasesDetalles: any = [];

  constructor(
    private api: ApiLoginService,
    private activeroute: ActivatedRoute,
    private router: Router,
    private storage: Storage,
    private crud: CrudStorageService) { }

  ngOnInit() {
    this.cargarDatosUsuario();
  }

  async cargarDatosUsuario() {
    const usuario = await this.storage.get('currentUser');
    if (usuario) {
      this.usuarioData = usuario;
      this.clasesUsuario = usuario.clase_a_cargo;
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
  cerrarSesion() {
    this.crud.clearCurrentUser()
    this.router.navigate(['/inicio']);

  }
}
