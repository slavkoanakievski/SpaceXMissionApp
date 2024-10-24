import { Component } from '@angular/core';

@Component({
  selector: 'sxm-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  public activeMissionType: string = 'latest'; // Default active mission type

  public changeMissionType(type: string): void {
    this.activeMissionType = type;
    // Emit an event or call a service to fetch data based on the selected type
  }
}
