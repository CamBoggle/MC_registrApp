import { ComponentFixture, TestBed,  fakeAsync, waitForAsync  } from '@angular/core/testing';
import { DetalleAsignaturaPage } from './detalle-asignatura.page';
//Import adicionales
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

// describe('DetalleAsignaturaPage', () => {
//   let component: DetalleAsignaturaPage;
//   let fixture: ComponentFixture<DetalleAsignaturaPage>;

//   beforeEach(async(() => {
//     fixture = TestBed.createComponent(DetalleAsignaturaPage);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   }));

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

describe('==== Prueba detalle Asignatura ====', () => {
  let component: DetalleAsignaturaPage;
  let fixture: ComponentFixture<DetalleAsignaturaPage>;

  beforeEach(waitForAsync( async() => {
    await TestBed.configureTestingModule({
      declarations: [DetalleAsignaturaPage],
      imports : [IonicModule.forRoot(), FormsModule, RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(DetalleAsignaturaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));


  it('Alumnos Presentes: El metodo contara los alumbnos presentes en clases',() => {
    const mockAsistencia = { alumno_presente: ['alumno1', 'alumno2', 'alumno3'] };
    const resultado = component.contarAlumnosPresentes(mockAsistencia);
    expect(resultado).toEqual(3);
  });

  it('Alumnos Presentes: No hay alumnos en la clase',() => {
    const mockAsistencia = { alumno_presente: [] };
    const resultado = component.contarAlumnosPresentes(mockAsistencia);
    expect(resultado).toEqual(0);
  });
});
