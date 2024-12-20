import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from '../auth/guards/auth.guard';
import { SpacexLatestLaunchComponent } from './components/spacex-latest-launch/spacex-latest-launch.component';
import { SpacexUpcomingLaunchesComponent } from './components/spacex-upcoming-launches/spacex-upcoming-launches.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'spacex-latest-launch',
    component: SpacexLatestLaunchComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'spacex-upcoming-launches',
    component: SpacexUpcomingLaunchesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'spacex-past-launches',
    component: SpacexUpcomingLaunchesComponent,
    data: { launchType: 'past' },
  },
  {
    path: '**',
    component: NotFoundComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
