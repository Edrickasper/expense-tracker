import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category.model';
import { MatDialog } from '@angular/material/dialog';

import { CategoryPopupComponent } from './category-popup/category-popup.component';
import { CategoryService } from '../services/category.service';
import { take } from 'rxjs';
import { SnackBarService } from '../services/snack-bar.service';
import { TrashService } from '../services/trash.service';
import { MovementService } from '../services/movement.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit {
  isLoading = false;
  categories: Category[] = [];

  constructor(
    private categoryService: CategoryService,
    private trashService: TrashService,
    private dialog: MatDialog,
    private movementService: MovementService
  ) { }


  ngOnInit() {
    this.isLoading = true;
    this.categoryService.onFetchCategory().subscribe()
    this.categoryService.categoriesChanged.subscribe(
      (categories: Category[]) => {
        this.categories = categories;
        this.isLoading = false
      }
    );
  }

  edit(index: number) {
    const popup = this.dialog.open(CategoryPopupComponent, {
      disableClose: true,
      width: '60%',
      height: 'auto',
      data: {
        index: index,
      },
    });
    popup.afterClosed().subscribe((category: Category) => {
      if (category) this.categoryService.updateCategory(category);
    });
  }

  delete(cat: Category) {
    this.categoryService.deleteCategory(cat);
    const movementsToTrash = this.movementService.deleteMovementsByCategory(cat.name)
    movementsToTrash.forEach(mov => {
      this.trashService.addMovement(mov);
    })
    this.trashService.addCategory(cat)
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
