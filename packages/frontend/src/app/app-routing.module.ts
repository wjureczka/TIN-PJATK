import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {BarListingComponent} from "./bars-listing/bar-listing.component";
import {RegisterPageComponent} from "./session/register/register-page.component";
import {LoginPageComponent} from "./session/login/login-page.component";
import {BarComponent} from "./bar/bar.component";

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
    component: LoginPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
