import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Bar, BarMenu, BarService} from "../shared/bar.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AddBarMenuDialogComponent} from "./add-bar-menu-dialog/add-bar-menu-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {AuthService} from "../shared/auth.service";
import {catchError, take, tap} from "rxjs/operators";
import {EditBarMenuComponent} from "./edit-bar-menu/edit-bar-menu.component";

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
export class BarComponent implements OnInit {

  private barId: string;

  public isOwnedByUser: boolean = false;

  public bar: Bar;

  constructor(private barsService: BarService,
              private route: ActivatedRoute,
              private snackbar: MatSnackBar,
              public dialog: MatDialog,
              public authService: AuthService
  ) {
    this.barId = route.snapshot.paramMap.get('barId')
  }

  ngOnInit(): void {
    this.getBar();
  }

  public getBar() {
    this.barsService.getBar(this.barId).toPromise()
      .then((bar) => {
        this.bar = bar;

        this.isOwnedByUser = bar.ownedBy === this.authService.user.value.id;
      })
      .catch(() => {
        this.snackbar.open('Nie udało się pobrać informacji o barze!', '', { duration: 1000 })
      });
  }

  public handleOnMenuAddClick() {
    const dialogRef = this.dialog.open(AddBarMenuDialogComponent, {
      width: '50%',
      data: this.bar
    });

    dialogRef.afterClosed().subscribe(shouldRefresh => {
      if (shouldRefresh) {
        this.getBar()
      }
    });
  }

  public openBarMenuEditionDialog(barMenu: BarMenu) {
    const dialogRef = this.dialog.open(EditBarMenuComponent, {
      width: '50%',
      data: {
        barMenu,
        barId: this.barId
      }
    })

    dialogRef.afterClosed().subscribe(shouldRefresh => {
      if (shouldRefresh) {
        this.getBar()
      }
    });
  }

  public deleteBarMenu(menu: BarMenu) {
    this.barsService.deleteBarMenu(this.barId, menu._id)
      .subscribe(
        () => {
          const menuIndex = this.bar.menu.indexOf(menu);
          this.bar.menu.splice(menuIndex, 1);
        },
        () => {
          this.snackbar.open('Nie udało się usunąć menu', '', { duration: 1000 })
        }
      );
  }
}
