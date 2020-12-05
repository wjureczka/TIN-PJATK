import {NgModule} from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';

import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {NavbarComponent} from './navbar.component';
import {LanguageSelectorComponent} from './language-selector/language-selector.component';
import {UserMenuComponent} from './user-menu/user-menu.component';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    NavbarComponent,
    LanguageSelectorComponent,
    UserMenuComponent
  ],
  exports: [
    LanguageSelectorComponent,
    UserMenuComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    MatMenuModule,
    MatButtonModule,
    RouterModule
  ]
})
export class NavbarModule {
}
