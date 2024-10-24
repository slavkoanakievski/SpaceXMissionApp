import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'sxm-not-found',
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {
  constructor(private _router: Router) {}

  onGoBackToHome() {
    this._router.navigate(["/spacex-latest-launch"]).catch();
  }
}