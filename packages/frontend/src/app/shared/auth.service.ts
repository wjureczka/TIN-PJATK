import {Injectable} from "@angular/core";
import {CookieService} from "ngx-cookie-service";
import jwtDecode from 'jwt-decode';
import {BehaviorSubject, ReplaySubject} from "rxjs";
import {HttpClient} from "@angular/common/http";

interface JWTPayload {
  id: string;
  email: string;
  isAdmin: boolean;
}

export interface User {
  id: string;
  email: string;
  isAdmin: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly JWT_ACCESS_TOKEN_COOKIE_NAME = 'TIN_PJATK_ACCESS_TOKEN_COOKIE';

  public readonly user: BehaviorSubject<User | null> = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient, private cookieService: CookieService) {
  }

  public checkIfIsAuthorized() {
    return this.http.get('auth/isLoggedIn', {withCredentials: true})
      .toPromise()
      .then(() => {
        this.authorize();
      })
      .catch(() => {
        this.setUser(null);
      });
  }

  public authorize() {
    const accessToken = this.getAccessTokenFromCookie();

    if (!accessToken) {
      this.setUser(null);
    }

    const user = this.getUserFromAccessToken(accessToken);

    this.setUser(user);
  }

  public setUser(user: User | null) {
    this.user.next(user);
  }

  public getUserFromAccessToken(accessToken: string): User | null {
    try {
      const jwtPayload = jwtDecode(accessToken) as JWTPayload;

      return {
        id: jwtPayload.id,
        email: jwtPayload.email,
        isAdmin: jwtPayload.isAdmin
      }
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  public getAccessTokenFromCookie(): string {
    return this.cookieService.get(this.JWT_ACCESS_TOKEN_COOKIE_NAME);
  }

}
