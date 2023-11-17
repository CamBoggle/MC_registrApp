import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiLoginService {
  private urlAPI = "http://localhost:3000/";
  
  listado : any = [];

  horario : any = [];

  constructor(private http: HttpClient) { }

  getlogin(usuario: string, password: string)
  {
    const url = this.urlAPI + 'usuario?user='+usuario+'&contrasena='+password;
      return this.http.get<any>(url);      
  }

  getHorario(id: string)
  {
    const url = this.urlAPI + 'Horario?idUsuario=' + id;
    return this.http.get<any[]>(url);
  }

  
  getUsuario(id : string)
  {
    const url = this.urlAPI + 'usuario?idUsuario=' + id;
    return this.http.get<any>(url);
  }

  getHoraProf(id: string)
  {
    const url = this.urlAPI + 'HoraProfesor?idUsuario=' + id;
    return this.http.get<any>(url)
  }

  getInfoQR(id:string)
  {
    const url = this.urlAPI + 'HoraProfesor?idAsignatura=' + id;
    return this.http.get<any>(url)
  }
}
