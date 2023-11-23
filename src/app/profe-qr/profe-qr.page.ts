import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiLoginService } from '../inicio/api-login.service';

@Component({
  selector: 'app-profe-qr',
  templateUrl: './profe-qr.page.html',
  styleUrls: ['./profe-qr.page.scss'],
})
export class ProfeQRPage implements OnInit {

  seccionQR: any = [];
  id_asitencia: string = '';
  detalleAsistencia: any = [];
  usuariosPresentes: any = [];

  constructor(
    private api: ApiLoginService,
    private activeroute: ActivatedRoute,
    private router: Router
  ) { }



  ngOnInit() {
    this.activeroute.queryParams.subscribe(params => {
      this.id_asitencia = params['id_asistencia'];
      if (this.id_asitencia) {
        console.log(this.id_asitencia)
        this.api.obtenerAsistencia(this.id_asitencia)
            .then(asistencia => {
              this.detalleAsistencia = asistencia;
              // Ahora, obtén la información de cada usuario inscrito
              if (this.detalleAsistencia.alumno_presente) {
                this.detalleAsistencia.alumno_presente.forEach((usuario: string) => {
                  this.api.obtenerUsuario(usuario).then(userInfo => {
                    if (userInfo) {
                      this.usuariosPresentes.push(userInfo);
                    }
                  });
                });
              }
            })
            .catch(error => {
              console.error('Error al obtener la asignatura:', error);
            });
      }
    }
    )
  };
}
