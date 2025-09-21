import { Injectable } from '@angular/core';
import { Subject, take, tap } from 'rxjs';

import { Category } from '../models/category.model';
import { DataStorageService } from './data-storage.service';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  categoriesChanged = new Subject<Category[]>();

  private categories: Category[] = [
    new Category('Food', 'expense', '#dc2626', false),
    new Category('Clothes', 'expense', '#dc2626', true),
    new Category('Salary', 'income', '#dc2626', false),
  ];

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthenticationService
  ) { }

  getCategory() {
    return this.categories.slice();
  }

  onFetchCategory() {
    return this.dataStorageService.fetchCategory().pipe(
      tap((categories: Category[]) => {
        this.categories = categories;
        this.categoriesChanged.next(this.getCategory());
      })
    );
  }

  addInitialCategory() {
    this.authService.addCatinDB.pipe(take(1)).subscribe((uid) => {
      for (let category of this.categories) {
        this.dataStorageService.addCategoryinDB(category);
      }
    });
  }

  addCategory(category: Category) {
    this.dataStorageService.addCategoryinDB(category);
    this.onFetchCategory();
  }

  updateCategory(category: Category) {
    this.dataStorageService.updateCategoryinDB(category);
    this.onFetchCategory();
  }

  getCategoryById(index: number) {
    return this.categories[index];
  }

  deleteCategory(category: Category) {
    this.dataStorageService.deleteCategoryinDB(category);
    this.onFetchCategory();
  }
}
