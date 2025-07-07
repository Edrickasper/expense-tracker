import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';

import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-display-profile',
  templateUrl: './display-profile.component.html',
  styleUrl: './display-profile.component.css',
})
export class DisplayProfileComponent implements OnInit {
  constructor(private authService: AuthenticationService) {}
  user!: User | null;
  ngOnInit() {
    this.authService.user$.subscribe({
      next: (user: any) => {
        if (user) this.user = user;
      },
    });
  }
}
