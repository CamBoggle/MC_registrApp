import { Injectable } from '@angular/core';
import { Database, ref, get, set, update, push } from '@angular/fire/database';



@Injectable({
  providedIn: 'root'
})
export class ApiLoginService {
 
  constructor(private db: Database) {}

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

// async alumnoPresente(idAsistencia: string, idUsuario: string) {
//   const asistenciaRef = ref(this.db, `Asistencia/${idAsistencia}/alumno_presente`);

//   // Obtener el objeto actual de 'alumno_presente'
//   const snapshot = await get(asistenciaRef);

//   // Definir el tipo de 'alumnosPresentes' como un objeto cuyas claves son strings
//   let alumnosPresentes: { [key: string]: string } = {};

//   if (snapshot.exists() && typeof snapshot.val() === 'object') {
//     // Si el objeto ya existe, lo copiamos
//     alumnosPresentes = snapshot.val();
//   }

//   // Generar una clave única para el nuevo usuario
//   const newKeyRef = push(asistenciaRef);
//   const newKey = newKeyRef.key;

//   // Asegurarse de que newKey no sea null
//   if (newKey !== null && !Object.values(alumnosPresentes).includes(idUsuario)) {
//     alumnosPresentes[newKey] = idUsuario;
//     // Actualizar el objeto en Firebase
//     await update(asistenciaRef, alumnosPresentes);
//   }
// }

async alumnoPresente(idAsistencia: string, idUsuario: string): Promise<void> {
  const attendanceRef = ref(this.db, `Asistencia/${idAsistencia}`);
  try {
    const snapshot = await get(attendanceRef);
    if (snapshot.exists()) {
      const attendance = snapshot.val();
      attendance.attendance_students = attendance.attendance_students || [];
      if (!attendance.attendance_students.includes(idUsuario)) {
        attendance.attendance_students.push(idUsuario);
        await set(attendanceRef, attendance);
      }
    } else {
      console.log('Attendance record not found');
    }
  } catch (error) {
    console.error('Error updating attendance record:', error);
    throw error;
  }
} 
  

}

