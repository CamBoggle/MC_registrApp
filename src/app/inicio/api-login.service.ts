import { Injectable } from '@angular/core';
import { Database, ref, get, set, update, push } from '@angular/fire/database';
import { AlertController } from '@ionic/angular';



@Injectable({
  providedIn: 'root'
})
export class ApiLoginService {

  ocultar: boolean = false;

  constructor(
    private db: Database,
    private alertController: AlertController) { }

  async obtenerUsuario(user: string) {
    const userRef = ref(this.db, `/usuario/${user}`);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return null;
    }
  }

  async obtenerAsignatura(idAsignatura: string) {
    const asignaturaRef = ref(this.db, `/Asignatura/${idAsignatura}`);
    const snapshot = await get(asignaturaRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return null;
    }
  }

  async obtenerAsistencia(idAsistencia: string) {
    const asistenciaRef = ref(this.db, `/Asistencia/${idAsistencia}`);
    const snapshot = await get(asistenciaRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return null;
    }
  }

  async crearRegistroAsistencia(idAsistencia: string, idClase: string, fecha: number, nombreAsignatura: string, codigoProfesor: string) {
    // Crear una referencia específica con el idAsistencia proporcionado
    const asistenciaRef = ref(this.db, `Asistencia/${idAsistencia}`);

    // Setear los valores del registro de asistencia
    await set(asistenciaRef, {
      idClase: idClase,
      fecha: fecha,
      nombre_asignatura: nombreAsignatura,
      codigo_profesor: codigoProfesor,
      id_asistencia: idAsistencia // Asumiendo que también quieres almacenar el ID dentro del objeto
    });
    // Retornar el ID de asistencia para confirmar la creación
    return idAsistencia;
  }


  async alumnoPresente(idAsistencia: string, idUsuario: string, clases_alumno: any[]): Promise<void> {
    const attendanceRef = ref(this.db, `Asistencia/${idAsistencia}`);
    try {
      const snapshot = await get(attendanceRef);
      if (snapshot.exists()) {
        const attendance = snapshot.val();
        const pertenece = await this.alumnoPertenece(attendance.idClase, clases_alumno)
        console.log("///////////",pertenece)
        if (!pertenece) {
          await this.mostrarAlerta('Error', 'El alumno no pertenece a esta clase');
          return
        }
        else {
          attendance.alumno_presente = attendance.alumno_presente || [];
          if (!attendance.alumno_presente.includes(idUsuario)) {
            attendance.alumno_presente.push(idUsuario);
            await set(attendanceRef, attendance);
          }
        }
      } else {
        console.log('Attendance record not found');
      }
    } catch (error) {
      console.error('Error updating attendance record:', error);
      throw error;
    }
  }


  async alumnoPertenece(idAsignatura: number, clases_inscrita: any[]) {
    const idAsignaturaStr = idAsignatura.toString();
    const estaInscrito = clases_inscrita.includes(idAsignaturaStr);
    console.log("++++++++++++++++++++",idAsignaturaStr)
    console.log("++++++++++++++++++++",clases_inscrita)
    console.log(estaInscrito);
    return estaInscrito ? true : null;
  }




  // async alumnoPertenece(idAsignatura: number, clases_inscrita: any[]): Promise<boolean> {
  //   const estaInscrito = clases_inscrita.includes(idAsignatura);
  //   return estaInscrito;
  // }
  





  async obtenerAsistenciasPorClase(idClase: string) {
    const asistenciasRef = ref(this.db, '/Asistencia');
    const snapshot = await get(asistenciasRef);
    if (snapshot.exists()) {
      const todasLasAsistencias = snapshot.val();
      const asistenciasFiltradas = Object.keys(todasLasAsistencias)
        .filter(key => todasLasAsistencias[key].idClase == idClase)
        .map(key => {
          return {
            ...todasLasAsistencias[key],
            id: key // Si necesitas el ID de asistencia en tus datos
          };
        });
      return asistenciasFiltradas;
    } else {
      return [];
    }
  }


  async obtenerAsistenciasPorAlumno(idAlumno: string) {
    const asistenciasRef = ref(this.db, '/Asistencia');
    const snapshot = await get(asistenciasRef);
    if (snapshot.exists()) {
      const todasLasAsistencias = snapshot.val();
      const asistenciasFiltradas = Object.keys(todasLasAsistencias)
        .filter(key => todasLasAsistencias[key].alumno_presente.includes(idAlumno))
        .map(key => {
          return {
            ...todasLasAsistencias[key],
            id: key // Si necesitas el ID de asistencia en tus datos
          };
        });
      return asistenciasFiltradas;
    } else {
      return [];
    }
  }

  //METODO DE QR

  mostrarQR() {
    this.ocultar = true;
  }

  ocultarQ() {
    this.ocultar = false;
  }

  getOcultar(): boolean {
    return this.ocultar;
  }

  //ALERTA
  async mostrarAlerta(titulo: string, mensaje: string): Promise<void> {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });
  
    await alert.present();
  }


}

