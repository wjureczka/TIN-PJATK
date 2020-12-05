import {Component, ViewChild} from '@angular/core';
import {CredentialsFormComponent} from '../../shared/forms/credentials-form/credentials-form.component';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  @ViewChild('form')
  form: CredentialsFormComponent;

  constructor() {
  }

  signIn(): void {
  }

}
