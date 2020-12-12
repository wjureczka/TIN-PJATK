import {Component, Input, OnInit} from '@angular/core';
import {AdministrationService, ManufacturerWithBeers} from "../administration.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-manufacturer-panel',
  templateUrl: './manufacturer-panel.component.html',
  styleUrls: ['./manufacturer-panel.component.scss']
})
export class ManufacturerPanelComponent implements OnInit {

  public isLoading: boolean = false;

  public isNameEditable: boolean = false;

  public changedManufacturerName: string = '';

  @Input()
  public manufacturer: ManufacturerWithBeers;

  constructor(private administrationService: AdministrationService, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.changedManufacturerName = this.manufacturer.name;
  }

  public handleManufacturerNameInput($event) {
    $event.stopPropagation();
  }

  public handleManufacturerNameClick($event) {
    $event.stopPropagation();
  }

  public handleManufacturerNameBlur($event) {
    $event.stopPropagation();
    this.changedManufacturerName = $event.target.textContent;
  }

  public openManufacturerNameEdition($event) {
    $event.stopPropagation();
    this.isNameEditable = true;
  }

  public cancelManufacturerNameEdition($event) {
    $event.stopPropagation();
    this.isNameEditable = false;
    this.changedManufacturerName = this.manufacturer.name;
  }

  public handleManufacturerNameChange($event) {
    $event.stopPropagation();

    this.administrationService
      .changeManufacturerName(this.changedManufacturerName, this.manufacturer._id)
      .toPromise()
      .then((data) => {
        this.manufacturer = data;
        this.isNameEditable = false;
      })
      .catch(() => {
        this.snackbar.open('Nie udało zmienić się nazwy producenta');
      })
  }
}
