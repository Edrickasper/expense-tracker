import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';

import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthenticationService) {}
  title = 'expense-tracker';
  isLoading = false;
  user!: User;

  ngOnInit() {
    this.isLoading = true;
    this.authService.user$.subscribe({
      next: (user: any) => {
        if (user) {
          this.user = user;
          this.isLoading = false;
        } else {
          this.isLoading = false;
        }
      },
    });
  }
}
