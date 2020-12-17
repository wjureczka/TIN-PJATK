import { Component, OnInit } from '@angular/core';
import {AdministrationService, ManufacturerWithBeers} from "./administration.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent implements OnInit {

  public isLoading: boolean = false;

  public manufacturers: ManufacturerWithBeers[] = [];

  constructor(private administrationService: AdministrationService, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.administrationService.getManufacturersWithBeers().toPromise()
      .then((data) => {
        this.manufacturers = data;
      })
      .catch(() => {})
  }

  public handleOnAddClick() {
    this.isLoading = true;

    this.administrationService.createExampleProducer()
      .toPromise()
      .then((response) => {
        this.manufacturers.push(response);
      })
      .catch(() => {
        this.snackbar.open('Nie udało się stworzyć nowego producenta', '', { duration: 1000 })
      });

    this.isLoading = false;
  }

  public handleOnDeleteEvent(manufacturer: ManufacturerWithBeers) {
    const deletedManufacturerIndex = this.manufacturers.indexOf(manufacturer)
    this.manufacturers.splice(deletedManufacturerIndex, 1);
  }
}
