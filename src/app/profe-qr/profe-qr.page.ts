import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiLoginService } from '../inicio/api-login.service';

@Component({
  selector: 'app-profe-qr',
  templateUrl: './profe-qr.page.html',
  styleUrls: ['./profe-qr.page.scss'],
})
export class ProfeQRPage implements OnInit {

  seccionQR : any = [];

  constructor(
    private api: ApiLoginService,
    private activeroute: ActivatedRoute, 
    private router: Router
  ) { }

  ngOnInit() 
  {
    // this.activeroute.paramMap.subscribe(p => {
    //   const dataUser = p.get('idAsignatura') ?? "";
    //     this.api.getInfoQR(dataUser).subscribe(userData => {
    //       this.seccionQR = userData;
    //     });
    //   });
  }

}
