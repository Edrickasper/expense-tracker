import { Component } from '@angular/core';
import { Category } from '../models/category.model';
import { MatDialog } from '@angular/material/dialog';

import { CategoryPopupComponent } from './category-popup/category-popup.component';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
  standalone: false,
})
export class CategoriesComponent {
  categories!: Category[];

  constructor(
    private dialog: MatDialog,
    private categoryService: CategoryService
  ) {}

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
