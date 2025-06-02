import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Movement } from '../models/movement.model';
import { RestorePopupComponent } from './restore-popup/restore-popup.component';
import { MovementService } from '../services/movement.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrl: './trash.component.css',
})
export class TrashComponent implements OnInit {
  trash!: Movement[];
  movementsDate!: boolean[];
  prevDate!: string;
  isEmpty = false;

  constructor(
    private dialog: MatDialog,
    private movementService: MovementService
  ) {}

  ngOnInit() {
    this.trash = this.movementService.getTrash();
    this.movementService.trashChanged.subscribe((movements: Movement[]) => {
      this.trash = movements;
    });
    if (!this.trash) {
      this.isEmpty = true;
    }
    this.movementsDate = this.movementService.buildMovementDates(this.trash);
  }

  formatCur(value: number) {
    const locale = navigator.language;
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'INR',
    }).format(value);
  }

  onrestoreMovement(index: number) {
    const popup = this.dialog.open(RestorePopupComponent);
    popup.afterClosed().subscribe((restore: boolean) => {
      if (restore) this.movementService.restoreMovement(index);
    });
  }
}
