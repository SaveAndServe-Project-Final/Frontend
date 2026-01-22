import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NuestrosBeneficiariosPage } from './nuestros-beneficiarios.page';

describe('NuestrosBeneficiariosPage', () => {
  let component: NuestrosBeneficiariosPage;
  let fixture: ComponentFixture<NuestrosBeneficiariosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NuestrosBeneficiariosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
