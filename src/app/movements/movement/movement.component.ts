import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Movement } from '../../models/movement.model';
import { MovementPopupComponent } from '../movement-popup/movement-popup.component';
import { MovementService } from '../../services/movement.service';

@Component({
  selector: 'app-movement',
  templateUrl: './movement.component.html',
  styleUrl: './movement.component.css',
})
export class MovementComponent implements OnInit {
  movements!: Movement[];
  groupedMovements: { date: string; items: any[] }[] = [];

  constructor(
    private movementService: MovementService,
    private dialog: MatDialog
  ) { }

  afterMovementChanges() { }

  ngOnInit() {
    this.movements = this.movementService.getmovements();
    this.movementService.movementsChanged.subscribe((movements: Movement[]) => {
      this.movements = movements;
      this.groupByDate();
    });
    this.groupByDate();
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
