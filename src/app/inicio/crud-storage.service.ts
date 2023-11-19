import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class CrudStorageService {

  constructor(
    private storage: Storage
  ) { this.storage.create();}

  async guardar(id: string, usuario: any) {
    const usuarioParaGuardar = { ...usuario };
    delete usuarioParaGuardar.contrasena; // Eliminar la contraseña por seguridad

    await this.storage.set(id, usuarioParaGuardar);
    console.log(this.storage.get)
  }

  // async guardar(id : string, nombre : any)
  // {
  //   //funciona con clave/valor (id/valor)
  //   await this.storage.set(id,nombre);
  // }

  //TRAE LA INFORMACION DE LA KEY
  async leer(id : string)
  {
    return await this.storage.get(id);
  }
}
