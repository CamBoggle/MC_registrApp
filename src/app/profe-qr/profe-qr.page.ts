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

  constructor(
    private api: ApiLoginService,
    private activeroute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.activeroute.queryParams.subscribe(params => {
      this.id_asitencia = params['classId'];
      if (this.id_asitencia) {
        return
      }
    }
    )
  };
}
