import {Component, Input, OnInit} from '@angular/core';
import {Beer} from "../../administration.service";

export interface PeriodicElement {
  name: string;
  weight: number;
  editable: boolean;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {name: 'Hydrogen', weight: 1.0079, editable: false},
  {name: 'Helium', weight: 4.0026, editable: false},
  {name: 'Lithium', weight: 6.941, editable: false},
  {name: 'Beryllium', weight: 9.0122, editable: false},
  { name: 'Boron', weight: 10.811, editable: false},
  { name: 'Carbon', weight: 12.0107, editable: false},
  { name: 'Nitrogen', weight: 14.0067, editable: false},
  { name: 'Oxygen', weight: 15.9994, editable: false},
  { name: 'Fluorine', weight: 18.9984, editable: false},
  { name: 'Neon', weight: 20.1797, editable: false},
];

interface ManufacturerBeerElement extends Beer {
  isEditable: boolean
}

@Component({
  selector: 'app-manufacturer-beers',
  templateUrl: './manufacturer-beers.component.html',
  styleUrls: ['./manufacturer-beers.component.scss']
})
export class ManufacturerBeersComponent implements OnInit {

  displayedColumns: string[] = ['index', 'name', 'alcoholContent', 'actions'];

  @Input()
  public manufacturerBeers: Beer[] = []

  public manufacturerBeersDataSource: ManufacturerBeerElement[] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.manufacturerBeersDataSource = this.prepareManufacturerBeersDataSource(this.manufacturerBeers);
  }

  public prepareManufacturerBeersDataSource(manufacturerBeers: Beer[]): ManufacturerBeerElement[] {
    return manufacturerBeers.map((beer) => ({
      ...beer,
      isEditable: false
    }))
  }

  public toggleRowEditable(element: ManufacturerBeerElement) {
    element.isEditable = !element.isEditable;
  }

  public handleOnDone(element) {
    console.log(element);
  }
}
