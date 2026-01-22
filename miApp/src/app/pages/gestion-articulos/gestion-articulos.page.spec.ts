import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GestionArticulosPage } from './gestion-articulos.page';

describe('GestionArticulosPage', () => {
  let component: GestionArticulosPage;
  let fixture: ComponentFixture<GestionArticulosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionArticulosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
