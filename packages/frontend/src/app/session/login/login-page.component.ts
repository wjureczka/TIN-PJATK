import {Component, ViewChild} from '@angular/core';
import {CredentialsFormComponent} from '../../shared/forms/credentials-form/credentials-form.component';
import {SessionService} from "../session.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {AuthService} from "../../shared/auth.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  @ViewChild('form')
  form: CredentialsFormComponent;

  constructor(private sessionService: SessionService,
              private snackbar: MatSnackBar,
              private router: Router,
              private authService: AuthService
  ) {
  }

  signIn(): void {
    this.sessionService.login({ email: this.form.email, password: this.form.password })
      .toPromise()
      .then((response) => {
        this.authService.authorize();

        return this.router.navigate(['/beer-bars'])
      })
      .catch(() => {
        this.snackbar.open('Nie udało się zalogować, spróbuj ponownie', '', { duration: 1000 })
      })
  }

}
