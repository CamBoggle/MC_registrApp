import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiLoginService } from '../inicio/api-login.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-dos.profesor',
  templateUrl: './dos.profesor.page.html',
  styleUrls: ['./dos.profesor.page.scss'],
})
export class DosProfesorPage implements OnInit {

  horarios: any = [];
  usuarioData: any = [];
  texto: any;

  constructor(
    private api: ApiLoginService,
    private activeroute: ActivatedRoute, 
    private router: Router,
    private storage: Storage) { }

  ngOnInit() {
    this.activeroute.paramMap.subscribe(p => {
      const dataUser = p.get('idUsuario') ?? "";
        this.api.getUsuario(dataUser).subscribe(userData => {
          this.usuarioData = userData;
          const idUsuario = p.get('idUsuario') ?? "";
          this.api.getHoraProf(idUsuario).subscribe(data => {
            this.horarios = data;
          });
        });
      });
  }

}
