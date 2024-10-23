import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { LoginDto } from '../models/login-dto';

@Injectable()
export class AuthenticationService {
  private _baseUrl = `${environment.apiBase}/user`;

  constructor(private http: HttpClient) { }

  public loginUser(loginDto: LoginDto): Observable<string> {
    return this.http.post<string>(`${this._baseUrl}/login`, loginDto);
  }
}
