import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { SpacexMissionsService } from '../../../auth/services/spacex-missions.service';
import { SpacexMissionResponse } from '../../shared/models/spacex-mission-response';

@Component({
  selector: 'sxm-spacex-upcoming-launches',
  templateUrl: './spacex-upcoming-launches.component.html',
  styleUrls: ['./spacex-upcoming-launches.component.scss'],
})
export class SpacexUpcomingLaunchesComponent implements OnInit, OnDestroy {
  public allMissions: SpacexMissionResponse[] = [];
  public displayedMissions: SpacexMissionResponse[] = [];
  public totalItems: number = 0;
  public itemsPerPage: number = 6;
  public currentPage: number = 1;
  private destroy$ = new Subject<void>();

  constructor(
    private spaceXService: SpacexMissionsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.data
      .pipe(
        takeUntil(this.destroy$),
        switchMap((data) => {
          const launchType = data['launchType'] || 'upcoming';
          return launchType === 'past'
            ? this.spaceXService.getPastSpaceXMissions()
            : this.spaceXService.getUpcomingSpaceXMissions();
        })
      )
      .subscribe((response) => {
        this.allMissions = response.data;
        this.totalItems = this.allMissions.length;
        this.updateDisplayedMissions();
      });
  }

  updateDisplayedMissions() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedMissions = this.allMissions.slice(startIndex, endIndex);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.updateDisplayedMissions();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
