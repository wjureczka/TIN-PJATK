import {NgModule} from "@angular/core";
import {BarListingComponent} from "./bar-listing.component";
import {BarService} from "../shared/bar.service";
import { BarListingItemComponent } from './bar-listing-item/bar-listing-item.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    BarListingComponent,
    BarListingItemComponent
  ],
  providers: [
    BarService
  ],
    imports: [
        MatSelectModule,
        MatFormFieldModule,
        MatOptionModule,
        CommonModule,
        RouterModule
    ],
  exports: [BarListingComponent]
})
export class BarListingModule {}
