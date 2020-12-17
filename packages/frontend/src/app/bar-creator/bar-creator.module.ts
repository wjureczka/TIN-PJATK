import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarCreatorComponent } from './bar-creator.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {BarService} from "../shared/bar.service";



@NgModule({
  declarations: [BarCreatorComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  providers: [
    BarService
  ],
  exports: [
    BarCreatorComponent
  ]
})
export class BarCreatorModule { }
