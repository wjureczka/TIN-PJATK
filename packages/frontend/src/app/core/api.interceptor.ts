import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {environment} from '../../environments/environment';
import {AuthService} from "../shared/auth.service";
import {Router} from "@angular/router";
import {catchError, tap} from "rxjs/operators";

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) {
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

    return next.handle(apiRequest).pipe(catchError((err, caught) => {
      if(err instanceof HttpErrorResponse) {
        if(err.status === 401) {
          this.router.navigate(['/login']);
        }

      }

      return throwError(err);
    }));
  }
}
