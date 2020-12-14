import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';

import {CredentialsFormComponent} from '../../shared/forms/credentials-form/credentials-form.component';
import {SessionService} from '../session.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  @ViewChild('form')
  form: CredentialsFormComponent;

  constructor(private sessionService: SessionService,
              private snackbar: MatSnackBar,
              private router: Router
  ) {}

  ngOnInit(): void {
  }

  async register(): Promise<any> {
    const { email, password } = this.form;

    this.sessionService.register({ email, password }).subscribe(
      () => {
        this.snackbar.open('Zarejestrowano!');

        this.router.navigate(['/login']);
      },
      (() => {
        this.snackbar.open('Ups!');
      })
    );
  }

}
