import { TestBed } from '@angular/core/testing';

import { RegistroBeneficiarioDataService } from './registro-beneficiario-data.service';

describe('RegistroDataService', () => {
  let service: RegistroBeneficiarioDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistroBeneficiarioDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
