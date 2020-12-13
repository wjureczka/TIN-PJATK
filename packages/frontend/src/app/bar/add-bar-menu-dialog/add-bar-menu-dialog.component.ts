import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Bar} from "../../shared/bar.service";
import {AdministrationService, ManufacturerWithBeers} from "../../administration/administration.service";
import {MatSnackBar} from "@angular/material/snack-bar";

interface AddManufacturerWithBeersDialog extends ManufacturerWithBeers {
  price: number
}

@Component({
  selector: 'app-add-bar-menu-dialog',
  templateUrl: './add-bar-menu-dialog.component.html',
  styleUrls: ['./add-bar-menu-dialog.component.scss']
})
export class AddBarMenuDialogComponent implements OnInit {

  public manufacturers: ManufacturerWithBeers[] = [];

  public mappedManufacturers: AddManufacturerWithBeersDialog[] = [];

  public selectedManufacturer: ManufacturerWithBeers;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Bar,
  private dialogRef: MatDialogRef<AddBarMenuDialogComponent>,
  private administrationService: AdministrationService,
    private snackbar: MatSnackBar
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.getManufacturersWithBeers();
    this.mappedManufacturers = this.manufacturers.map(this.mapManufacturerWithBeers);
  }

  private mapManufacturerWithBeers(manufacturer: ManufacturerWithBeers): AddManufacturerWithBeersDialog {
    return { ...manufacturer, price: 0 };
  }

  private getManufacturersWithBeers() {
    this.administrationService.getManufacturersWithBeers()
      .toPromise()
      .then((manufacturers) => {
        this.manufacturers = manufacturers;
      })
      .catch(() => {
        this.snackbar.open('Nie udało się pobrać producentów i ich piw');
        this.dialogRef.close();
      });
  }
}
