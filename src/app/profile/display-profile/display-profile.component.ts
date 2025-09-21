import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';

import { AuthenticationService } from '../../services/authentication.service';
import { MovementService } from '../../services/movement.service';
import { Movement } from '../../models/movement.model';

@Component({
  selector: 'app-display-profile',
  templateUrl: './display-profile.component.html',
  styleUrl: './display-profile.component.css',
})
export class DisplayProfileComponent implements OnInit {
  constructor(private authService: AuthenticationService, private movService: MovementService) { }
  user: User | null = null;
  latestMov!: Movement[]
  ngOnInit() {
    this.authService.user$.subscribe({
      next: (user: any) => {
        if (user) this.user = user;
        this.getLatestMov()
      },
    });
  }

  getLatestMov() {
    this.movService.onFetchMovement().subscribe({
      next: (mov => {
        this.latestMov = mov.slice(-3);
      })
    })
  }
}
