import { Injectable } from '@angular/core';
import { BancoDeAlimentos } from 'src/app/models/bancoAlimentos.model';
import { Empresa } from 'src/app/models/empresa.model';

@Injectable({
  providedIn: 'root'
})
export class RegistroBeneficiarioDataService {

  constructor() { }
  private beneficiarioData: BancoDeAlimentos | null = null;

  setBeneficiarioData(data: BancoDeAlimentos): void {
    this.beneficiarioData = data;
  }

  getBeneficiarioData(): BancoDeAlimentos | null {
    return this.beneficiarioData;
  }

  clearBeneficiarioData(): void {
    this.beneficiarioData = null;
  }
}
