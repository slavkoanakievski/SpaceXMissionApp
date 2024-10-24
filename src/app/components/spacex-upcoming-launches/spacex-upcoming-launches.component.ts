import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiResponse } from '../../../auth/models/api-response';
import { SpacexMissionResponse } from '../../shared/models/spacex-mission-response';
import { SpacexMissionsService } from '../../../auth/services/spacex-missions.service';

@Component({
  selector: 'sxm-spacex-upcoming-launches',
  templateUrl: './spacex-upcoming-launches.component.html',
  styleUrl: './spacex-upcoming-launches.component.scss',
})
export class SpacexUpcomingLaunchesComponent implements OnInit {
  public upcomingMissions$: Observable<ApiResponse<SpacexMissionResponse[]>>;

  constructor(private spaceXService: SpacexMissionsService) {}

  ngOnInit(): void {
    this.upcomingMissions$ = this.spaceXService.getUpcomingSpaceXMissions();
  }
}

