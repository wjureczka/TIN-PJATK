import {Component, Input, OnInit} from '@angular/core';
import {AdministrationService, Beer} from "../../administration.service";
import {MatSnackBar} from "@angular/material/snack-bar";

interface ManufacturerBeerElement extends Beer {
  isEditable: boolean;
  isVirtual: boolean;
  newName: string;
  newAlcoholContent: string;
}

@Component({
  selector: 'app-manufacturer-beers',
  templateUrl: './manufacturer-beers.component.html',
  styleUrls: ['./manufacturer-beers.component.scss']
})
export class ManufacturerBeersComponent implements OnInit {

  public displayedColumns: string[] = ['index', 'name', 'alcoholContent', 'actions'];

  @Input()
  public manufacturerBeers: Beer[] = []

  @Input()
  public manufacturedId: string;

  public manufacturerBeersDataSource: ManufacturerBeerElement[] = [];

  constructor(private administrationService: AdministrationService,
              private snackbar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.manufacturerBeersDataSource = this.manufacturerBeers.map(this.prepareManufacturerBeerDataSource);
  }

  private prepareManufacturerBeerDataSource(beer: Beer): ManufacturerBeerElement {
    return {
      ...beer,
      isEditable: false,
      isVirtual: false,
      newName: beer.name,
      newAlcoholContent: beer.alcoholContent
    }
  }

  public handleNameBlur($event, element) {
    element.newName = $event.target.textContent;
  }

  public handleAlcoholContentBlur($event, element) {
    element.newAlcoholContent = $event.target.textContent;
  }

  public openRowEdition(element: ManufacturerBeerElement) {
    element.isEditable = !element.isEditable;
  }

  public cancelRowEdition(element) {
    element.isEditable = false;

    element.newName = element.name;
    element.newAlcoholContent = element.alcoholContent;
  }

  public handleOnEditionDone(element) {
    this.administrationService.changeBeer({
      _id: element._id,
      name: element.newName,
      alcoholContent: element.newAlcoholContent
    })
      .toPromise()
      .then((beer) => {
        element.isEditable = false;
        element = {...element, ...beer};
      })
      .catch(() => {
        this.snackbar.open('Nie udało się edytować piwa');
      })
  }

  public handleOnAddBeerClick() {
    const virtualBeerName = 'Tutaj wpisz nazwę';
    const virtualBeerAlcoholContent = 'Tutaj wpisz zawartość alkoholu w %';

    const virtualBeer: ManufacturerBeerElement = {
      _id: `${Date.now()}`,
      _manufacturerId: this.manufacturedId,
      name: virtualBeerName,
      newName: virtualBeerName,
      alcoholContent: virtualBeerAlcoholContent,
      newAlcoholContent: virtualBeerAlcoholContent,
      isEditable: true,
      isVirtual: true
    }

    this.manufacturerBeersDataSource = [...this.manufacturerBeersDataSource, virtualBeer];
  }

  public handleOnBeerAdd(beer: ManufacturerBeerElement) {
    this.administrationService
      .addBeer({ _manufacturerId: this.manufacturedId,  name: beer.newName, alcoholContent: beer.newAlcoholContent })
      .toPromise()
      .then((newBeer) => {
        this.deleteBeerFromDataSource(beer);

        const newBeerDataSource = this.prepareManufacturerBeerDataSource(newBeer);

        this.manufacturerBeersDataSource = [...this.manufacturerBeersDataSource, newBeerDataSource];
      })
      .catch(() => {
        this.snackbar.open('Nie udało dodać się piwa')
      })
  }

  public handleOnCancelBeerAdd(beer: ManufacturerBeerElement) {
    this.deleteBeerFromDataSource(beer);
  }

  public deleteBeerFromDataSource(beer: ManufacturerBeerElement) {
    const beerIndex = this.manufacturerBeersDataSource.indexOf(beer);

    this.manufacturerBeersDataSource.splice(beerIndex, 1);

    this.manufacturerBeersDataSource = [...this.manufacturerBeersDataSource];
  }
}
