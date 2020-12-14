import {NgModule} from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';

import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {NavbarComponent} from './navbar.component';
import {UserMenuComponent} from './user-menu/user-menu.component';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule} from '@angular/router';
import {AuthService} from "../shared/auth.service";

@NgModule({
  declarations: [
    NavbarComponent,
    UserMenuComponent
  ],
  exports: [
    UserMenuComponent,
    NavbarComponent
  ],
  providers: [
    AuthService
  ],
  imports: [
    CommonModule,
    TranslateModule,
    MatMenuModule,
    MatButtonModule,
    RouterModule,
  ]
})
export class NavbarModule {
}
