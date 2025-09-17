import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription, take } from 'rxjs';

import { MovementPopupComponent } from './movement-popup/movement-popup.component';
import { Movement } from '../models/movement.model';
import { MovementService } from '../services/movement.service';
import { SnackBarService } from '../services/snack-bar.service';

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrl: './movements.component.css',
})
export class MovementsComponent implements OnInit {
  isLoading: boolean = false;
  movements!: Movement[];
  groupedMovements: { date: string; items: any[] }[] = [];

  constructor(
    private movementService: MovementService,
    private dialog: MatDialog,
    private snackBar: SnackBarService,
  ) { }

  ngOnInit() {
    this.movements = this.movementService.getmovements();
    this.movementService.movementsChanged.subscribe((movements: Movement[]) => {
      this.movements = movements;
      this.groupByDate();
    });
    this.groupByDate();
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

  groupByDate() {
    const grouped: { [key: string]: any[] } = {};

    this.movements.forEach(tx => {
      if (!grouped[tx.date]) {
        grouped[tx.date] = [];
      }
      grouped[tx.date].push(tx);
    });

    // Convert object into array & sort by date (latest first)
    this.groupedMovements = Object.keys(grouped)
      .map(date => ({
        date,
        items: grouped[date]
      }))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  edit(index: number) {
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
    });
  }
}
