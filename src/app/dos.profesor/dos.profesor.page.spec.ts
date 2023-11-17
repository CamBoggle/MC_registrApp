import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DosProfesorPage } from './dos.profesor.page';

describe('DosProfesorPage', () => {
  let component: DosProfesorPage;
  let fixture: ComponentFixture<DosProfesorPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DosProfesorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
