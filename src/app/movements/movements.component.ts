import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { MovementPopupComponent } from './movement-popup/movement-popup.component';
import { Movement } from '../models/movement.model';
import { MovementService } from '../services/movement.service';

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrl: './movements.component.css',
  standalone: false,
})
export class MovementsComponent implements OnInit {
  movementSub!: Subscription;
  constructor(
    private movementService: MovementService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    
  }

  openPopup() {
    const popup = this.dialog.open(MovementPopupComponent, {
      disableClose: true,
      width: '60%',
      height: 'auto',
    });
    popup.afterClosed().subscribe((movement: Movement) => {
      if (movement) this.movementService.addMovement(movement);
    });
  }
}
