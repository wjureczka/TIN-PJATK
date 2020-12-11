import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatExpansionModule} from "@angular/material/expansion";

import { AdministrationComponent } from './administration.component';
import {AdministrationService} from "./administration.service";



@NgModule({
  declarations: [AdministrationComponent],
  imports: [
    CommonModule,
    MatExpansionModule
  ],
  providers: [
    AdministrationService
  ]
})
export class AdministrationModule { }
