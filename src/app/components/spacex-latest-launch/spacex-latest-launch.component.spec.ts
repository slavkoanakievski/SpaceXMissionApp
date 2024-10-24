import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpacexLatestLaunchComponent } from './spacex-latest-launch.component';

describe('SpacexMissionsComponent', () => {
  let component: SpacexLatestLaunchComponent;
  let fixture: ComponentFixture<SpacexLatestLaunchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpacexLatestLaunchComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SpacexLatestLaunchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
