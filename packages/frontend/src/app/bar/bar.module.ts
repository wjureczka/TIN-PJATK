import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {BarComponent} from "./bar.component";
import {BarService} from "../shared/bar.service";
import {MatButtonModule} from "@angular/material/button";
import { AddBarMenuDialogComponent } from './add-bar-menu-dialog/add-bar-menu-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {AdministrationService} from "../administration/administration.service";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import { EditBarMenuComponent } from './edit-bar-menu/edit-bar-menu.component';


@NgModule({
  declarations: [BarComponent, AddBarMenuDialogComponent, EditBarMenuComponent],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule
  ],
  providers: [
    BarService,
    AdministrationService,
  ],

})
export class BarModule {}
