import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SnackBarService } from '../services/snack-bar.service';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private snackBar: SnackBarService
  ) {}

  user!: User | null;
  ngOnInit() {
    this.authService.user$.subscribe({
      next: (user: any) => {
        if (user) {
          this.user = user;
          this.authService.curUser = user;
        }
      },
    });
  }

  logOut() {
    this.authService.signOut();
    this.snackBar.showSuccess('Successfully Signed out');
    this.router.navigate(['/']);
  }
}
