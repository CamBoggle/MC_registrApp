import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiLoginService } from '../inicio/api-login.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-dos',
  templateUrl: './dos.page.html',
  styleUrls: ['./dos.page.scss'],
})
export class DosPage implements OnInit {

 
  horarios: any = [];
  usuarioData: any = [];

  constructor(
    private api: ApiLoginService,
    private activeroute: ActivatedRoute, 
    private router: Router,
    private storage: Storage) { }


  ngOnInit() {
    // this.activeroute.paramMap.subscribe(p => {
    //   const idUsuario = p.get('idUsuario') ?? "";
    //   this.api.getHorario(idUsuario).subscribe(data => {
    //     this.horarios = data;
    //     const dataUser = p.get('idUsuario') ?? "";
    //     this.api.getUsuario(dataUser).subscribe(userData => {
    //       this.usuarioData = userData;
    //     });
    //   });
    // });
  }
}
