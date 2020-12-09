import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginPageComponent} from './login/login-page.component';

import {CredentialsFormModule} from '../shared/forms/credentials-form/credentials-form.module';
import {RouterModule} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {RegisterPageComponent} from './register/register-page.component';
import {SessionService} from './session.service';

@NgModule({
  declarations: [
    LoginPageComponent,
    RegisterPageComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    CredentialsFormModule,
    RouterModule,
  ],
  providers: [
    SessionService
  ],
  exports: []
})
export class SessionModule {
}
