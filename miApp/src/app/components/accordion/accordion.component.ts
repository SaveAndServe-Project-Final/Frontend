import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
  standalone: false
})
export class AccordionComponent  implements OnInit {
  public expandedAccordion = 'first';
  constructor() { }

  ngOnInit() {}
  accordionChange(event: { detail: { value: any; }; }) {
    console.log('Acordeón seleccionado:', event.detail.value);
  }

}
