import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

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

  constructor(private http: HttpClient) { }

  login(loginDTO: LoginDTO) {
    return this.http.post<LoginResponse>('auth/login', loginDTO, { withCredentials: true });
  }

  register(registerDTO: RegisterDTO) {
    return this.http.post('users', registerDTO);
  }
}
