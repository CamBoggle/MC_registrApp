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

  constructor(
    private activeroute: ActivatedRoute,
    private router: Router,
    private api: ApiLoginService,
    ) { }

  ngOnInit() {
    this.activeroute.queryParams.subscribe(params => {
      this.classId = params['classId'];
      console.log(this.classId)
      if (this.classId) {
        this.api.obtenerAsignatura(this.classId)
          .then(asignatura => {
            this.detalleClase = asignatura;
            console.log(this.detalleClase);
          })
          .catch(error => {
            console.error('Error al obtener la asignatura:', error);
          });
      }
    });
  }
}
