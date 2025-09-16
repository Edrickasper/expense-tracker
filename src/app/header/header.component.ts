import { Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
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
  menuOpen: boolean = false;
  @ViewChild('dropdown') dropdown!: ElementRef;
  @Input() user!: User | null;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private snackBar: SnackBarService
  ) { }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (this.menuOpen && this.dropdown && !this.dropdown.nativeElement.contains(event.target)) {
      this.menuOpen = false;
    }
  }


  logOut() {
    this.authService.signOut();
    this.snackBar.showSuccess('Successfully Signed out');
    this.router.navigate(['/login']);
  }
}
