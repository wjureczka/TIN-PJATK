import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginPageComponent} from './login/login-page.component';

import {CredentialsFormModule} from '../shared/forms/credentials-form/credentials-form.module';
import {RouterModule} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {RegisterPageComponent} from './register/register-page.component';
import {SessionService} from './session.service';
import {LogoutComponent} from './logout/logout.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {AuthService} from "../shared/auth.service";

@NgModule({
  declarations: [
    LoginPageComponent,
    RegisterPageComponent,
    LogoutComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    CredentialsFormModule,
    RouterModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    SessionService,
    AuthService
  ],
  exports: []
})
export class SessionModule {
}
