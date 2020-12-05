import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginPageComponent} from './login/login-page.component';

import {CredentialsFormModule} from '../shared/forms/credentials-form/credentials-form.module';
import {TranslateModule} from '@ngx-translate/core';
import {RouterModule} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {RegisterPageComponent} from './register/register-page.component';
import {SessionService} from './session.service';
import {SessionRoutingModule} from './session-routing.module';

@NgModule({
  declarations: [
    LoginPageComponent,
    RegisterPageComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    CredentialsFormModule,
    TranslateModule,
    SessionRoutingModule,
    RouterModule,
  ],
  providers: [
    SessionService
  ],
  exports: []
})
export class SessionModule {
}
