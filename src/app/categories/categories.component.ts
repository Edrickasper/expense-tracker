import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category.model';
import { MatDialog } from '@angular/material/dialog';

import { CategoryPopupComponent } from './category-popup/category-popup.component';
import { CategoryService } from '../services/category.service';
import { take } from 'rxjs';
import { SnackBarService } from '../services/snack-bar.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit {
  categories!: Category[];
  isLoading = false;

  constructor(
    private dialog: MatDialog,
    private categoryService: CategoryService,
    private snackBar: SnackBarService
  ) { }

  ngOnInit(): void {
    /* this.isLoading = true
    this.categoryService
      .onFetchCategory()
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.isLoading = false;
        },
        error: (err) => {
          this.isLoading = false;
          this.snackBar.showError(err);
        },
      }); */
  }

  openPopup() {
    const popup = this.dialog.open(CategoryPopupComponent, {
      disableClose: true,
      width: '60%',
      height: 'auto',
    });
    popup.afterClosed().subscribe((category: Category) => {
      if (category) this.categoryService.addCategory(category);
    });
  }
}
