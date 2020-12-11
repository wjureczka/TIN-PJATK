import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-beer-producer-panel',
  templateUrl: './beer-producer-panel.component.html',
  styleUrls: ['./beer-producer-panel.component.scss']
})
export class BeerProducerPanelComponent implements OnInit {

  public isNameEditable: string = 'false';

  constructor() { }

  ngOnInit(): void {
  }

  public handleManufacturerNameClick($event) {
    $event.stopPropagation();

    if (this.isNameEditable === 'false') {
      this.toggleManufacturerNameEdition($event);
    }
  }

  public handleManufacturerNameChange($event) {
    $event.stopPropagation();
    console.log($event.target.textContent);
  }

  public toggleManufacturerNameEdition($event) {
    $event.stopPropagation();
    this.isNameEditable = this.isNameEditable === 'true' ? 'false' : 'true';
  }

}
