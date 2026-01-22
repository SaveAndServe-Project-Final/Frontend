import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleArticuloPage } from './detalle-articulo.page';

describe('DetalleArticuloPage', () => {
  let component: DetalleArticuloPage;
  let fixture: ComponentFixture<DetalleArticuloPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleArticuloPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
