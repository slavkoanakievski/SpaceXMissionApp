import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { filter, map, Observable } from 'rxjs';
import { LoginDto } from '../models/login-dto';
import { RegisterDto } from '../models/register-dto';
import { AuthenticatedResponse } from '../models/authenticated-response';
import { ApiResponse } from '../models/api-response';
import { TokenDto } from '../models/token-dto';

@Injectable()
export class AuthenticationService {
  private _baseUrl = `${environment.apiBase}/user`;

  constructor(private http: HttpClient) {}

  public loginUser(
    loginDto: LoginDto
  ): Observable<ApiResponse<AuthenticatedResponse>> {
    return this.http
      .post<ApiResponse<AuthenticatedResponse>>(
        `${this._baseUrl}/login`,
        loginDto
      )
      .pipe(
        map((response) => {
          if (response.success) {
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);
          } else {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
          }
          return response;
        })
      );
  }

  public registerUser(registerDto: RegisterDto): Observable<ApiResponse<string>> {
    return this.http.post<ApiResponse<string>>(`${this._baseUrl}/register`, registerDto);
  }

  public refreshToken(tokenDto: TokenDto): Observable<ApiResponse<TokenDto>> {
    return this.http.post<ApiResponse<TokenDto>>(
      `${this._baseUrl}/refresh`,
      tokenDto
    );
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('accessToken') !== null;
  }
}
