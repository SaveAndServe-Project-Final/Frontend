import { Component, Inject } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
 
  constructor(private menu: MenuController) { }
 
   openMenu() {
     this.menu.open('first');
   }

}
