import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GestionDonantesPage } from './gestion-donantes.page';

describe('GestionDonantesPage', () => {
  let component: GestionDonantesPage;
  let fixture: ComponentFixture<GestionDonantesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionDonantesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
