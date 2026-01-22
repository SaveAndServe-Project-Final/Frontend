import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilBeneficiarioPage } from './perfil-beneficiario.page';

describe('PerfilBeneficiarioPage', () => {
  let component: PerfilBeneficiarioPage;
  let fixture: ComponentFixture<PerfilBeneficiarioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilBeneficiarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
