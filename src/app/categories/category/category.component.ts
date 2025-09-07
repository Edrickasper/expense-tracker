import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';
import { CategoryPopupComponent } from '../category-popup/category-popup.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent implements OnInit {
  constructor(
    private categoryService: CategoryService,
    private dialog: MatDialog
  ) {}

  categories!: Category[];

  ngOnInit() {
    this.categories = this.categoryService.getCategory();
    this.categoryService.categoriesChanged.subscribe(
      (categories: Category[]) => {
        this.categories = categories;
      }
    );
  }

  openPopup(index: number) {
    const popup = this.dialog.open(CategoryPopupComponent, {
      disableClose: true,
      width: '60%',
      height: 'auto',
      data: {
        index: index,
      },
    });
    popup.afterClosed().subscribe((category: Category) => {
      if (category) this.categoryService.updateCategory(index, category);
    });
  }
}
