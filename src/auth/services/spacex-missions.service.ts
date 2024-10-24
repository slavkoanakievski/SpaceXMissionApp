import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response';
import { SpacexMissionResponse } from '../../app/shared/models/spacex-mission-response';

@Injectable({
  providedIn: 'root',
})
export class SpacexMissionsService {
  private _baseUrl = `${environment.apiBase}/spaceXMissions`;

  constructor(private http: HttpClient) {}

  public getLatestSpaceXMissions(): Observable<
    ApiResponse<SpacexMissionResponse>
  > {
    return this.http.get<ApiResponse<SpacexMissionResponse>>(
      `${this._baseUrl}/latest`
    );
  }

  public getPastSpaceXMissions(): Observable<
    ApiResponse<SpacexMissionResponse[]>
  > {
    return this.http.get<ApiResponse<SpacexMissionResponse[]>>(
      `${this._baseUrl}/past`
    );
  }

  public getUpcomingSpaceXMissions(): Observable<
    ApiResponse<SpacexMissionResponse[]>
  > {
    return this.http.get<ApiResponse<SpacexMissionResponse[]>>(
      `${this._baseUrl}/upcoming`
    );
  }
}
