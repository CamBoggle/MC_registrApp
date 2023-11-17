import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfeQRPage } from './profe-qr.page';

describe('ProfeQRPage', () => {
  let component: ProfeQRPage;
  let fixture: ComponentFixture<ProfeQRPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ProfeQRPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
