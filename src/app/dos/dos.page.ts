import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dos',
  templateUrl: './dos.page.html',
  styleUrls: ['./dos.page.scss'],
})
export class DosPage implements OnInit {

  data: any;
  

  constructor(private activeroute: ActivatedRoute, private router: Router) { 
    // Se declara e instancia un elemento de tipo NavigationExtras
    this.activeroute.queryParams.subscribe(params => {
      const navigationState = this.router.getCurrentNavigation()?.extras.state; // Validamos que en la navegacion actual tenga extras
      if(navigationState && 'user' in navigationState)
      {
        this.data = navigationState['user']; // Si tiene extra rescata lo enviado
        console.log(this.data)// Muestra por consola lo traido
      }
    });
  }

  ngOnInit() {
  }

}
