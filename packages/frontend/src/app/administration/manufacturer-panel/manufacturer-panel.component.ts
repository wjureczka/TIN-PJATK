import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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

  @Output()
  public onDeleteEvent: EventEmitter<ManufacturerWithBeers> = new EventEmitter();

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
        this.snackbar.open('Nie udało zmienić się nazwy producenta', '', { duration: 1000 });
      })
  }

  public deleteManufacturer($event) {
    $event.stopPropagation();
    this.administrationService.deleteManufacturer(this.manufacturer)
      .toPromise()
      .then(() => {
        this.onDeleteEvent.emit(this.manufacturer);
      })
      .catch(() => {
        this.snackbar.open('Nie udało się usunąć producenta', '', { duration: 1000 });
      })
  }
}
