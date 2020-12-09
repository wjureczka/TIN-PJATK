import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BarComponent} from "./bar.component";
import {BarService} from "../shared/bar.service";



@NgModule({
  declarations: [BarComponent],
  providers: [
    BarService
  ],
  imports: [
    CommonModule
  ]
})
export class BarModule { }
