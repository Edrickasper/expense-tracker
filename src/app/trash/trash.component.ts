import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Movement } from '../models/movement.model';
import { MovementService } from '../services/movement.service';
import { MovementPopupComponent } from '../movements/movement-popup/movement-popup.component';
import { TrashService } from '../services/trash.service';
import { SnackBarService } from '../services/snack-bar.service';
import { take } from 'rxjs';
import { Category } from '../models/category.model';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrl: './trash.component.css',
})
export class TrashComponent implements OnInit {

  isLoading: boolean = false;
  movements: Movement[] = [];
  groupedMovements: { date: string; items: any[] }[] = [];
  categories: Category[] = [
    new Category('Food', 'expense', '#dc2626', false),
    new Category('Clothes', 'expense', '#dc2626', true),
    new Category('Salary', 'income', '#dc2626', false),
  ];

  constructor(
    private dialog: MatDialog,
    private movementService: MovementService,
    private trashService: TrashService,
    private snackBar: SnackBarService
  ) { }

  restoreMovement(mov: Movement) {
    this.trashService.removeMovement(mov.id)
    this.movementService.addMovement(mov)
  }

  deleteMovementForever(mov: Movement) {
    this.trashService.removeMovement(mov.id)
  }

  restoreCategory(cat: Category) {
    throw new Error('Method not implemented.');
  }

  deleteCategoryForever(cat: Category) {
    throw new Error('Method not implemented.');
  }

  emptyTrash() {
    throw new Error('Method not implemented.');
  }

  ngOnInit() {
    this.isLoading = true;
    this.movements = this.trashService.getTrash();
    this.groupByDate();
    /* this.trashService
      .fetchTrash()
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          this.isLoading = false;
          this.movements = res
          this.groupByDate();
        },
        error: (err) => {
          this.isLoading = false;
          this.snackBar.showError(err);
        },
      }); */
    this.trashService.MovTrashChanged.subscribe((movements: Movement[]) => {
      this.movements = movements;
      this.groupByDate();
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

  /* formatCur(value: number) {
    const locale = navigator.language;
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'INR',
    }).format(value);
  } */
}
