import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Bar, BarService} from "../shared/bar.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AddBarMenuDialogComponent} from "./add-bar-menu-dialog/add-bar-menu-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
export class BarComponent implements OnInit {

  private barId: string;

  public bar: Bar;

  constructor(private barsService: BarService,
              private route: ActivatedRoute,
              private snackbar: MatSnackBar,
              public dialog: MatDialog
  ) {
    this.barId = route.snapshot.paramMap.get('barId')
  }

  ngOnInit(): void {
    this.barsService.getBar(this.barId).toPromise()
      .then((bar) => {
        this.bar = bar;
      })
      .catch(() => {
        this.snackbar.open('Nie udało się pobrać informacji o barze!')
      });
  }

  public handleOnMenuAddClick() {
      const dialogRef = this.dialog.open(AddBarMenuDialogComponent, {
        width: '50%',
        data: { bar: this.bar }
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed', result);
      });
  }
}
