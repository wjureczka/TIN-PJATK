import { Component, OnInit } from '@angular/core';
import {AdministrationService, ManufacturerWithBeers} from "./administration.service";

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent implements OnInit {

  public isLoading: boolean = false;

  public manufacturers: ManufacturerWithBeers[] = [];

  constructor(private administrationService: AdministrationService) { }

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
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      });

    this.isLoading = false;
  }
}
