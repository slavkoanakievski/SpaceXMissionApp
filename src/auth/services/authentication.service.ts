import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoginDto } from '../models/login-dto';
import { RegisterDto } from '../models/register-dto';
import { AuthenticatedResponse } from '../models/authenticated-response';
import { ApiResponse } from '../models/api-response';
import { TokenDto } from '../models/token-dto';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private _baseUrl = `${environment.apiBase}/user`;

  // BehaviorSubject to track user login state
  private loggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  public loggedIn$ = this.loggedInSubject.asObservable(); // Expose the observable to the rest of the app

  private userSubject = new BehaviorSubject<string | null>(this.getUserName());
  public user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

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
            localStorage.setItem('userName', response.data.userName);

            this.loggedInSubject.next(true);
            this.userSubject.next(response.data.accessToken);
          }
          return response;
        })
      );
  }

  public registerUser(
    registerDto: RegisterDto
  ): Observable<ApiResponse<string>> {
    return this.http.post<ApiResponse<string>>(
      `${this._baseUrl}/register`,
      registerDto
    );
  }

  public refreshToken(tokenDto: TokenDto): Observable<ApiResponse<TokenDto>> {
    return this.http.post<ApiResponse<TokenDto>>(
      `${this._baseUrl}/refresh`,
      tokenDto
    );
  }

  public logout(): void {
    localStorage.removeItem('accessToken');

    // Update BehaviorSubject values on logout
    this.loggedInSubject.next(false);
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('accessToken') !== null;
  }

  getUserName(): string | null {
    return localStorage.getItem('userName');
  }
}
