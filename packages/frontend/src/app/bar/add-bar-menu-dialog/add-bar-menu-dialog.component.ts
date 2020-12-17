import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Bar, BarService} from "../../shared/bar.service";
import {AdministrationService, Beer, ManufacturerWithBeers} from "../../administration/administration.service";
import {MatSnackBar} from "@angular/material/snack-bar";

interface AddManufacturerBeerDialog extends Beer {
  price: number
}

interface AddManufacturerWithBeersDialog extends ManufacturerWithBeers {
  beers: AddManufacturerBeerDialog[]
}

@Component({
  selector: 'app-add-bar-menu-dialog',
  templateUrl: './add-bar-menu-dialog.component.html',
  styleUrls: ['./add-bar-menu-dialog.component.scss']
})
export class AddBarMenuDialogComponent implements OnInit {

  public manufacturers: ManufacturerWithBeers[] = [];

  public mappedManufacturers: AddManufacturerWithBeersDialog[] = [];

  public selectedManufacturer: AddManufacturerWithBeersDialog;

  constructor(
    @Inject(MAT_DIALOG_DATA) public bar: Bar,
    private dialogRef: MatDialogRef<AddBarMenuDialogComponent>,
    private administrationService: AdministrationService,
    private barService: BarService,
    private snackbar: MatSnackBar
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.getManufacturersWithBeers();
  }

  public handleAddMenuClick() {
    const manufacturerId = this.selectedManufacturer._id;
    const beers = this.selectedManufacturer.beers
      .filter((beer) => beer.price > 0)
      .map((beer) => ({beerId: beer._id, price: beer.price}))

    if (!beers.length) {
      this.snackbar.open('Nie wybrano żadnych piw. Cena musi wynosić więcej niż 0.', '', {duration: 1000})
      return;
    }

    const menuDataToSend = {
      manufacturerId,
      beers
    };

    this.barService.addBarMenu(this.bar._id, menuDataToSend)
      .toPromise()
      .then((data) => {
        this.dialogRef.close(true);
      })
      .catch(() => {
        this.snackbar.open('Nie udało się stworzyć menu!', '', { duration: 1000 })
      })
  }

  private static mapManufacturerWithBeers(manufacturer: ManufacturerWithBeers): AddManufacturerWithBeersDialog {
    return {...manufacturer, beers: manufacturer.beers.map((beer) => ({...beer, price: 0}))};
  }

  private getManufacturersWithBeers() {
    this.administrationService.getManufacturersWithBeers()
      .toPromise()
      .then((manufacturers) => {
        this.manufacturers = manufacturers;

        const alreadyHaveManufacturersIds = this.bar.menu.map((menu) => menu.manufacturer._id)
        this.mappedManufacturers = manufacturers
          .filter((manufacturer) => !alreadyHaveManufacturersIds.includes(manufacturer._id))
          .map(AddBarMenuDialogComponent.mapManufacturerWithBeers);
      })
      .catch(() => {
        this.snackbar.open('Nie udało się pobrać producentów i ich wyrobów', '', { duration: 1000 });
        this.dialogRef.close();
      });
  }
}
