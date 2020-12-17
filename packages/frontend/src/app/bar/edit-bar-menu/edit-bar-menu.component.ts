import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {BarMenu, BarService} from "../../shared/bar.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-edit-bar-menu',
  templateUrl: './edit-bar-menu.component.html',
  styleUrls: ['./edit-bar-menu.component.scss']
})
export class EditBarMenuComponent implements OnInit {

  public barMenuToEdit: BarMenu;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { barMenu: BarMenu, barId: string },
    private dialogRef: MatDialogRef<EditBarMenuComponent>,
    private barService: BarService,
    private snackbar: MatSnackBar
  ) {
    this.barMenuToEdit = {...data.barMenu};
  }

  ngOnInit(): void {
  }

  public onClose() {
    this.dialogRef.close();
  }

  public editBarMenu() {
    this.barService.updateBarMenu(this.data.barId, this.barMenuToEdit)
      .subscribe(() => {
          this.dialogRef.close(true);
        },
        () => {
          this.snackbar.open('Nie udało się zaktualizować menu', '', { duration: 1000 })
        });
  }
}
