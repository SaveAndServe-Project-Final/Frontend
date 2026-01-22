import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GestionBeneficiariosPage } from './gestion-beneficiarios.page';

describe('GestionBeneficiariosPage', () => {
  let component: GestionBeneficiariosPage;
  let fixture: ComponentFixture<GestionBeneficiariosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionBeneficiariosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
