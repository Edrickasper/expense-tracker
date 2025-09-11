import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Movement } from '../models/movement.model';
import { MovementService } from '../services/movement.service';
import { MovementPopupComponent } from '../movements/movement-popup/movement-popup.component';
import { TrashService } from '../services/trash.service';
import { SnackBarService } from '../services/snack-bar.service';
import { take } from 'rxjs';

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
  isLoading: boolean = false;

  constructor(
    private dialog: MatDialog,
    private movementService: MovementService,
    private trashService: TrashService,
    private snackBar: SnackBarService
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.trashService
      .fetchTrash()
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.isLoading = false;
        },
        error: (err) => {
          this.isLoading = false;
          this.snackBar.showError(err);
        },
      });
    this.trashService.trashChanged.subscribe((movements: Movement[]) => {
      this.trash = movements;
      // this.movementsDate = this.movementService.buildMovementDates(this.trash);
      if (!this.trash[0]) {
        this.isEmpty = true;
      }
    });
  }

  formatCur(value: number) {
    const locale = navigator.language;
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'INR',
    }).format(value);
  }

  onrestoreMovement(index: number) {
    const popup = this.dialog.open(MovementPopupComponent, {
      disableClose: true,
      width: '60%',
      height: 'auto',
      data: {
        index: index,
        isTrashMode: true,
      },
    });
    popup.afterClosed().subscribe();
  }
}
