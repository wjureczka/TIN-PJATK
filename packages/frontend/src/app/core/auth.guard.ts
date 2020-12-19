import {Injectable, OnInit} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService, User} from "../shared/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const user = this.authService.user.value;

    if (!user) {
      this.authService.cleanAuthorizationCookies();
      this.authService.setUser(null);
      this.router.navigate(['/login']);
    }

    return true;
  }

}
