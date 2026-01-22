import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-terminos-condiciones-modal',
  templateUrl: './terminos-condiciones-modal.component.html',
  styleUrls: ['./terminos-condiciones-modal.component.scss'],
  
  imports: [ReactiveFormsModule, IonicModule, CommonModule], 
})
export class TerminosCondicionesModalComponent  implements OnInit {

  constructor(private modalCtrl: ModalController) {}

  cerrar() {
    this.modalCtrl.dismiss();
  }

  ngOnInit() {}

}
