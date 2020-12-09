import {Component, OnInit} from '@angular/core';
import {Bar, BarService, SortByType} from "../shared/bar.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-bars',
  templateUrl: './bar-listing.component.html',
  styleUrls: ['./bar-listing.component.scss']
})
export class BarListingComponent implements OnInit {

  public bars: Bar[] = [];

  public currentSort: SortByType = SortByType.BEST;

  public sortByTypeToTranslation = new Map([
    [SortByType.BEST, 'najlepsze'],
    [SortByType.LONGEST_ON_MARKET, 'najdłużej działające'],
    [SortByType.NEWEST, 'najnowsze']
  ])

  constructor(private barsService: BarService, private snackbar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.loadBars(SortByType.BEST);
  }

  public handleSortSelectChange(value: SortByType): void {
    this.loadBars(value)
  }

  private loadBars(sortBy: SortByType): void {
    this.barsService.getBars({sortBy})
      .toPromise()
      .then((response) => {
        this.bars = response;
      }).catch(() => {
      this.snackbar.open('Nie udało się załadować barów!');
    })
  }

}
