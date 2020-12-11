import { Component, OnInit } from '@angular/core';
import {AdministrationService} from "./administration.service";

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent implements OnInit {

  public isLoading: boolean = false;

  constructor(private administrationService: AdministrationService) { }

  ngOnInit(): void {
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
