import { Component, OnInit } from '@angular/core';

import { Movement } from '../models/movement.model';
import { MovementService } from '../services/movement.service';
import { TrashService } from '../services/trash.service';
import { SnackBarService } from '../services/snack-bar.service';
import { take } from 'rxjs';
import { Category } from '../models/category.model';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrl: './trash.component.css',
})
export class TrashComponent implements OnInit {

  isLoading: boolean = false;
  movements: Movement[] = [];
  groupedMovements: { date: string; items: any[] }[] = [];
  categories: Category[] = [];

  ngOnInit() {
    this.isLoading = true;
    this.movements = this.trashService.getTrashedMovement();
    this.groupByDate();
    this.categories = this.trashService.getTrashedCategory();
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
    this.trashService.trashedMovementChanged.subscribe((movements: Movement[]) => {
      this.movements = movements;
      this.groupByDate();
    });
    this.trashService.trashedCategoryChanged.subscribe((category: Category[]) => this.categories = category)
  }

  constructor(
    private movementService: MovementService,
    private catService: CategoryService,
    private trashService: TrashService,
    private snackBar: SnackBarService
  ) { }

  restoreMovement(mov: Movement) {
    mov.deletedDate = '';
    this.trashService.removeMovement(mov.id)
    this.movementService.addMovement(mov)
  }

  deleteMovementForever(mov: Movement) {
    this.trashService.removeMovement(mov.id)
  }

  restoreCategory(cat: Category) {
    this.trashService.removeCategory(cat.id);
    this.catService.addCategory(cat)
  }

  deleteCategoryForever(cat: Category) {
    this.trashService.removeCategory(cat.id)
  }

  emptyTrash() {
    this.trashService.clearTrash();
  }

  groupByDate() {
    const grouped: { [key: string]: any[] } = {};

    this.movements.forEach(tx => {
      if (!grouped[tx.date]) {
        grouped[tx.date] = [];
      }
      grouped[tx.date].push(tx);
    });

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
