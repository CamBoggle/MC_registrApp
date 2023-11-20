import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiLoginService } from '../inicio/api-login.service';


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
