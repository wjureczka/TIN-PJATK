import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BarService} from "../shared/bar.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-bar-creator',
  templateUrl: './bar-creator.component.html',
  styleUrls: ['./bar-creator.component.scss']
})
export class BarCreatorComponent implements OnInit {

  public isLoading: boolean = false;

  public barForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    location: ['', [Validators.required, Validators.minLength(3)]],
    operatingSinceDate: ['', Validators.required],
    phoneNumber: ['', Validators.required]
  })

  constructor(private formBuilder: FormBuilder, private barService: BarService, private router: Router, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
  }

  handleFormSubmit() {
    const { name, location, operatingSinceDate, phoneNumber } = this.barForm.getRawValue();

    this.isLoading = true;

    this.barService
      .createBar({ name, location, operatingSinceDate: new Date(operatingSinceDate), phoneNumber })
      .toPromise()
      .then((bar) => {
        this.isLoading = false;
        this.router.navigate([`bar/${bar._id}`])
      })
      .catch(() => {
        this.isLoading = false;
        this.snackbar.open('Nie udało sie dodać baru', '', { duration: 1000 });
      })
  }
}
