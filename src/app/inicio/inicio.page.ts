import { Component, OnInit } from '@angular/core';
import { Router, RouterLink,NavigationExtras } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  user={
    usuario:"",
    password:""
  }

  usuarioAdmin: string = "Admin";
  passAdmin: string = "admin123";

  constructor(private router: Router,private toastController: ToastController,private alertController: AlertController) { }

  ngOnInit() {
  }


  async errorUsuario(){
    const toast = await this.toastController.create({
      message:'Usuario o Contraseña Invalida',
      duration: 2000,
      position: 'bottom',
      color: 'danger',
    });
    await toast.present();
  }


  paginaPrincipal()
  {
    if(this.user.usuario == this.usuarioAdmin && this.user.password == this.passAdmin){
      // Se declara e instancia un elemento de tipo NavigationExtras
      let navigationExtras: NavigationExtras = {
        state: {
          user: this.user // Al estado se asignamos un objeto con clave y valor
        }
      };
      this.router.navigate(['/dos'],navigationExtras); // navegamos hacia el Home y enviamos información adicional
    }
    else{
      this.errorUsuario();
    }
  }


  async passAlerta() {
    const alert = await this.alertController.create({
      header: 'Ingrese Usuario',
      buttons: [{text:'Recuperar', handler : () =>{this.alerta2();}}],
      inputs: [
        {
          placeholder: 'Usuario',
        },
      ],
    });

    await alert.present();
  }


  async alerta2() {
    const alert = await this.alertController.create({
      header: 'Restablesca su contraseña',
      message: 'Se ha enviado un codigo a su correo registrado para restablecer su contraseña',
      buttons: ['ok'],
    });

    await alert.present();
  }

}
