import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthenticationService } from './services/authentication.service';
import { MovementService } from './services/movement.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: false,
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(
    private authService: AuthenticationService,
    private movemnentService: MovementService
  ) {}
  title = 'expense-tracker';
  isLoggedIn!: boolean;
  movementSub!: Subscription;

  ngOnInit() {
    if (this.authService.curUser) {
      this.isLoggedIn = true;
    }
    this.movementSub = this.movemnentService.onFetchMovement().subscribe();
  }

  ngOnDestroy() {
    this.movementSub.unsubscribe();
  }
}
