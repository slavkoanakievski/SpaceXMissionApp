import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpacexUpcomingLaunchesComponent } from './spacex-upcoming-launches.component';

describe('SpacexUpcomingLaunchesComponent', () => {
  let component: SpacexUpcomingLaunchesComponent;
  let fixture: ComponentFixture<SpacexUpcomingLaunchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpacexUpcomingLaunchesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpacexUpcomingLaunchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
