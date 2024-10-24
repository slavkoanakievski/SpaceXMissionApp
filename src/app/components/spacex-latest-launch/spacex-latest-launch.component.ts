import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../auth/models/api-response';
import { SpacexMissionsService } from '../../../auth/services/spacex-missions.service';
import { SpacexMissionResponse } from '../../shared/models/spacex-mission-response';

@Component({
  selector: 'sxm-spacex-missions',
  templateUrl: './spacex-latest-launch.component.html',
  styleUrl: './spacex-latest-launch.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpacexLatestLaunchComponent {
  public mission$: Observable<ApiResponse<SpacexMissionResponse>>;

  constructor(private spaceXService: SpacexMissionsService) {}

  ngOnInit(): void {
    this.mission$ = this.spaceXService.getLatestSpaceXMissions();
  }

}
