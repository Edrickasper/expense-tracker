import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@angular/fire/auth';

import { SnackBarService } from '../services/snack-bar.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private snackBar: SnackBarService
  ) { }

  @Input() user!: User | null;

  logOut() {
    this.authService.signOut();
    this.snackBar.showSuccess('Successfully Signed out');
    this.router.navigate(['/login']);
  }
}
