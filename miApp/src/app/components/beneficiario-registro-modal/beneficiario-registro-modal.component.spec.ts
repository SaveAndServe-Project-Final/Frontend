import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BeneficiarioRegistroModalComponent } from './beneficiario-registro-modal.component';

describe('BeneficiarioRegistroModalComponent', () => {
  let component: BeneficiarioRegistroModalComponent;
  let fixture: ComponentFixture<BeneficiarioRegistroModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BeneficiarioRegistroModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BeneficiarioRegistroModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
