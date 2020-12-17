import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {BarListingComponent} from "./bars-listing/bar-listing.component";
import {RegisterPageComponent} from "./session/register/register-page.component";
import {LoginPageComponent} from "./session/login/login-page.component";
import {BarComponent} from "./bar/bar.component";
import {ContactComponent} from "./contact/contact.component";
import {AdministrationComponent} from "./administration/administration.component";
import {AdminGuard} from "./core/admin.guard";
import {BarCreatorComponent} from "./bar-creator/bar-creator.component";
import {AuthGuard} from "./core/auth.guard";
import {LogoutComponent} from "./session/logout/logout.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'beer-bars',
    component: BarListingComponent
  },
  {
    path: 'bar/:barId',
    component: BarComponent
  },
  {
    path: 'register',
    component: RegisterPageComponent
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'administration',
    component: AdministrationComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'bar-creator',
    component: BarCreatorComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
