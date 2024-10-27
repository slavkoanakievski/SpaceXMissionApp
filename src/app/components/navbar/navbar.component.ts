import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../auth/services/authentication.service';

@Component({
  selector: 'sxm-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  user: string | null = null;

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.user = this.authService.getUserName();
    }
  }

  logout() {
    this.authService.logout();
  }
}
