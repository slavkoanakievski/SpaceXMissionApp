import { Component } from '@angular/core';
import { AuthenticationService } from '../auth/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(public authService: AuthenticationService) {}

  title = 'SpaceXMissionApp';
}
