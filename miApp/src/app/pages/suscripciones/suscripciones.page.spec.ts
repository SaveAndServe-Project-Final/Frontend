import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuscripcionesPage } from './suscripciones.page';

describe('SuscripcionesPage', () => {
  let component: SuscripcionesPage;
  let fixture: ComponentFixture<SuscripcionesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SuscripcionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
