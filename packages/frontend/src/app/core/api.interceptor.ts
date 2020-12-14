import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {AuthService} from "../shared/auth.service";

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const accessToken = this.authService.getAccessTokenFromCookie();

    const apiRequest = request.clone({
      url: `${environment.TIN_API_URL}/${request.url}`,
      setHeaders: {
        'Authorization': `Bearer ${accessToken}`
      },
      withCredentials: true
    });

    return next.handle(apiRequest);
  }
}
