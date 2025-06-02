import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Movement } from '../../models/movement.model';
import { MovementPopupComponent } from '../movement-popup/movement-popup.component';
import { MovementService } from '../../services/movement.service';

@Component({
  selector: 'app-movement',
  templateUrl: './movement.component.html',
  styleUrl: './movement.component.css',
  standalone: false,
})
export class MovementComponent implements OnInit {
  movements!: Movement[];
  movementDates!: boolean[];

  constructor(
    private movementService: MovementService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.movements = this.movementService.getmovements();
    this.movementDates = this.movementService.buildMovementDates(
      this.movements
    );

    this.movementService.movementsChanged.subscribe((movements: Movement[]) => {
      this.movements = movements;
    });
  }

  openPopup(index: number) {
    const popup = this.dialog.open(MovementPopupComponent, {
      disableClose: true,
      width: '60%',
      height: 'auto',
      data: {
        index: index,
      },
    });
    popup.afterClosed().subscribe((movement: Movement) => {
      if (movement) this.movementService.updateMovement(index, movement);
      this.movements = this.movementService.getmovements();
    });
  }

  formatCur(value: number) {
    const locale = navigator.language;
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'INR',
    }).format(value);
  }
}
