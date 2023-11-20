import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiLoginService } from '../inicio/api-login.service';
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-detalle-asignatura',
  templateUrl: './detalle-asignatura.page.html',
  styleUrls: ['./detalle-asignatura.page.scss'],
})
export class DetalleAsignaturaPage implements OnInit {

  classId!: string;
  detalleClase: any = [];
  usuariosInscritos: any[] = [];

  constructor(
    private activeroute: ActivatedRoute,
    private router: Router,
    private api: ApiLoginService,
    ) { }

    generateUuid(): string {
      return uuidv4();
    }

    getCurrentTimestamp(): number {
      return new Date().getTime();
    }

    ngOnInit() {
      this.activeroute.queryParams.subscribe(params => {
        this.classId = params['classId'];
        if (this.classId) {
          this.api.obtenerAsignatura(this.classId)
            .then(asignatura => {
              this.detalleClase = asignatura;
              // Ahora, obtén la información de cada usuario inscrito
              if (this.detalleClase.usuario_inscrito) {
                this.detalleClase.usuario_inscrito.forEach((usuario: string) => {
                  this.api.obtenerUsuario(usuario).then(userInfo => {
                    if (userInfo) {
                      this.usuariosInscritos.push(userInfo);
                    }
                  });
                });
              }
            })
            .catch(error => {
              console.error('Error al obtener la asignatura:', error);
            });
        }
      });
    }
}
