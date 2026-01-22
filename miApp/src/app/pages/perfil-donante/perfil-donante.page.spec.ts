import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilDonantePage } from './perfil-donante.page';

describe('PerfilDonantePage', () => {
  let component: PerfilDonantePage;
  let fixture: ComponentFixture<PerfilDonantePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilDonantePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
