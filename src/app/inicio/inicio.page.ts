import { Component, OnInit } from '@angular/core';
import { Router, RouterLink,NavigationExtras, ActivatedRoute } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { ApiLoginService } from './api-login.service';
import { CrudStorageService } from './crud-storage.service';



@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  usuario: string = "";
  password: string ="";
  user: any;

  constructor(
    private api: ApiLoginService,
    private activate: ActivatedRoute, 
    private router: Router,
    private toastController: ToastController,
    private alertController: AlertController,
    private crud: CrudStorageService) { }

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

  async iniciarSesion() {
    try {
      const usuario = await this.api.obtenerUsuario(this.usuario);
      if (usuario && usuario.contrasena === this.password) {
        console.log('Inicio de sesión exitoso');
        await this.crud.guardar(this.usuario, usuario); 
  
        // Redirección basada en el estado del usuario
        if (usuario.estado === 1) {
          this.router.navigate(['/dos']);
        } else if (usuario.estado === 0) {
          this.router.navigate(['/dos.profesor']);
        }
      } else {
        console.log('Credenciales incorrectas');
        // Manejar el caso de credenciales incorrectas
      }
    } catch (error) {
      console.error('Error durante el inicio de sesión:', error);
      // Manejar errores, como problemas de conexión o de servidor
    }
  }

  // async paginaPrincipal()
  // {
  //   this.api.getlogin(this.usuario,this.password).subscribe((data=[]) => {
  //     console.log(data);
  //   if(data.length == 1)
  //   {
  //     const usuario = data[0];
  //     this.crud.guardar(usuario.idUsuario,usuario.nombre);
  //     if (usuario.estado === 1) 
  //     {
  //       console.log("Usuario es alumno");
  //       this.router.navigate(['/dos', usuario.idUsuario]);
  //     }
  //     else
  //     {
  //       console.log("Usuario es profesor");
  //       this.router.navigate(['/dos.profesor', usuario.idUsuario]);
  //     } 
  //   }
  //   else
  //   {
  //     console.log("fsdfas52345");
  //     this.errorUsuario();
  //   }
  //   })
  // }


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
