import { ComponentFixture, TestBed,  fakeAsync, waitForAsync  } from '@angular/core/testing';
import { DetalleAsignaturaPage } from './detalle-asignatura.page';
//Import adicionales
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiLoginService } from '../inicio/api-login.service';
import { Database } from '@angular/fire/database';


class MockApiLoginService {
  // Simula las funciones y valores que esperas utilizar en tus pruebas
}

class MockDatabaseService {
  // Simula las funciones y valores que esperas utilizar en tus pruebas
}


describe('==== Prueba detalle Asignatura ====', () => {
  let component: DetalleAsignaturaPage;
  let fixture: ComponentFixture<DetalleAsignaturaPage>;

  // beforeEach(waitForAsync(() => {
  //   TestBed.configureTestingModule({
  //     declarations: [DetalleAsignaturaPage],
  //     imports : [IonicModule.forRoot(), FormsModule, RouterTestingModule]
  //   }).compileComponents();

  //   fixture = TestBed.createComponent(DetalleAsignaturaPage);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // }));

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleAsignaturaPage],
      imports: [IonicModule.forRoot(), FormsModule, RouterTestingModule],
      providers: [
        { provide: ApiLoginService, useClass: MockApiLoginService },
        { provide: Database, useClass: MockDatabaseService },
        // ... otros mocks o proveedores necesarios
      ]
    }).compileComponents();
  
    fixture = TestBed.createComponent(DetalleAsignaturaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));




  it('Alumnos Presentes: El metodo contara los alumnos presentes en clases', fakeAsync(() => {
    const mockAsistencia = { alumno_presente: ['alumno1', 'alumno2', 'alumno3'] };
    const resultado = component.contarAlumnosPresentes(mockAsistencia);
    expect(resultado).toEqual(3);
  }));

  it('Alumnos Presentes: No hay alumnos en la clase', fakeAsync(() => {
    const mockAsistencia = { alumno_presente: [] };
    const resultado = component.contarAlumnosPresentes(mockAsistencia);
    expect(resultado).toEqual(0);
  }));
});
