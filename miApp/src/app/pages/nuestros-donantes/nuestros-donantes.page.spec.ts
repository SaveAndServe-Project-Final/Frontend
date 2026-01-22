import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NuestrosDonantesPage } from './nuestros-donantes.page';

describe('NuestrosDonantesPage', () => {
  let component: NuestrosDonantesPage;
  let fixture: ComponentFixture<NuestrosDonantesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NuestrosDonantesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
