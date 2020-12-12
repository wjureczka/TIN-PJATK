import {Component, Input, OnInit} from '@angular/core';
import {ManufacturerWithBeers} from "../administration.service";

@Component({
  selector: 'app-beer-producer-panel',
  templateUrl: './beer-producer-panel.component.html',
  styleUrls: ['./beer-producer-panel.component.scss']
})
export class BeerProducerPanelComponent implements OnInit {

  public isNameEditable: boolean = false;

  @Input()
  public manufacturer: ManufacturerWithBeers

  constructor() { }

  ngOnInit(): void {
  }

  public handleManufacturerNameClick($event) {
    $event.stopPropagation();

    if (!this.isNameEditable) {
      this.toggleManufacturerNameEdition($event);
    }
  }

  public handleManufacturerNameChange($event) {
    $event.stopPropagation();
    console.log($event.target.textContent);
  }

  public toggleManufacturerNameEdition($event) {
    $event.stopPropagation();
    this.isNameEditable = !this.isNameEditable;
  }

}
