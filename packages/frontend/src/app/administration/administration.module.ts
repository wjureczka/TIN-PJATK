import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatTableModule} from "@angular/material/table";

import { AdministrationComponent } from './administration.component';
import {AdministrationService} from "./administration.service";
import {MatButtonModule} from "@angular/material/button";
import { BeerProducerPanelComponent } from './beer-producer-panel/beer-producer-panel.component';
import { ManufacturerBeersComponent } from './beer-producer-panel/manufacturer-beers/manufacturer-beers.component';



@NgModule({
  declarations: [AdministrationComponent, BeerProducerPanelComponent, ManufacturerBeersComponent],
  imports: [
    CommonModule,
    MatExpansionModule,
    MatButtonModule,
    MatTableModule,
    MatProgressSpinnerModule
  ],
  providers: [
    AdministrationService
  ]
})
export class AdministrationModule { }
