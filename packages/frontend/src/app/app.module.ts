import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSnackBar} from '@angular/material/snack-bar';

import {AppRoutingModule} from './app-routing.module';
import {ApiInterceptor} from "./core/api.interceptor";
import {NavbarModule} from "./navbar/navbar.module";
import {AppComponent} from "./app.component";
import {HomeModule} from "./home/home.module";
import {BarListingModule} from "./bars-listing/bar-listing.module";
import {SessionModule} from "./session/session.module";
import { ContactComponent } from './contact/contact.component';
import {AdministrationModule} from "./administration/administration.module";
import {BarModule} from "./bar/bar.module";

@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NavbarModule,
    HomeModule,
    BarModule,
    BarListingModule,
    SessionModule,
    AdministrationModule
  ],
  providers: [
    MatSnackBar,
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
