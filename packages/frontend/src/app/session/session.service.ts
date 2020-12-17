import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from "../shared/auth.service";

interface LoginDTO {
  email: string;
  password: string;
}

interface RegisterDTO {
  email: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  login(loginDTO: LoginDTO) {
    return this.http.post<LoginResponse>('auth/login', loginDTO, { withCredentials: true });
  }

  register(registerDTO: RegisterDTO) {
    return this.http.post('auth/register', registerDTO);
  }

  logout() {
    this.authService.cleanAuthorizationCookies();
  }
}
