import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Bar, BarService} from "../shared/bar.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
export class BarComponent implements OnInit {

  private barId: string;

  public bar: Bar;

  constructor(private barsService: BarService, private route: ActivatedRoute, private snackbar: MatSnackBar) {
    this.barId = route.snapshot.paramMap.get('barId')
  }

  ngOnInit(): void {
    this.barsService.getBar(this.barId).toPromise()
      .then((bar) => {
        this.bar = bar;
        console.log(this.bar);
      })
      .catch(() => {
        this.snackbar.open('Nie udało się pobrać informacji o barze!')
      });

  }
}
