import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { jwtDecode } from 'jwt-decode';
import { TokenDto } from '../models/token-dto';
import { catchError, map, Observable, of } from 'rxjs';
import { ApiResponse } from '../models/api-response';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  canActivate(): boolean {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      const currentTimeInSeconds = Date.now() / 1000;
      const decodedToken = jwtDecode(accessToken);

      const isExpired =
        decodedToken && decodedToken.exp
          ? decodedToken.exp < currentTimeInSeconds
          : false;

      if (isExpired) {
        this.tryRefreshingTokens(accessToken).subscribe(
          (isRefreshSuccess: boolean) => {
            if (!isRefreshSuccess) {
              this.router.navigateByUrl('/login');
            }

            if (isRefreshSuccess) {
              return true;
            }
            return false;
          }
        );
      }
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  } 

  private tryRefreshingTokens(accessToken: string): Observable<boolean> {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!accessToken || !refreshToken) {
      return of(false); // Return an observable emitting false if tokens are missing
    }

    return this.authService
      .refreshToken({ accessToken: accessToken, refreshToken })
      .pipe(
        map((res: ApiResponse<TokenDto>) => {
          if (res.success) {
            localStorage.setItem('accessToken', res.data.accessToken);
            localStorage.setItem('refreshToken', res.data.refreshToken);
            return true;
          } else {
            return false;
          }
        }),
        catchError(() => {
          return of(false);
        })
      );
  }
}
