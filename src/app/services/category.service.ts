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
    new Category('Food', 'expense', '#dc2626', false, '101'),
    new Category('Clothes', 'expense', '#dc2626', true, '102'),
    new Category('Salary', 'income', '#dc2626', false, '103'),
  ];

  constructor(
    // private dataStorageService: DataStorageService,
    private authService: AuthenticationService
  ) { }

  getCategory() {
    return this.categories.slice();
  }

  /* onFetchCategory() {
    return this.dataStorageService.fetchCategory().pipe(
      tap((categories: Category[]) => {
        this.categories = categories;
        this.categoriesChanged.next(this.getCategory());
      })
    );
  } */

  addInitialCategory() {
    this.authService.addCatinDB.pipe(take(1)).subscribe((uid) => {
      for (let category of this.categories) {
        // this.dataStorageService.initialCategories(uid, category);
      }
    });
  }

  addCategory(category: Category) {
    this.categories.push(category);
    // this.dataStorageService.addCategoryinDB(category);
    this.categoriesChanged.next(this.getCategory());
  }

  updateCategory(index: number, category: Category) {
    this.categories[index] = category;
    this.categoriesChanged.next(this.getCategory());
  }

  getCategoryById(index: number) {
    return this.categories[index];
  }

  deleteCategory(id?: string) {
    this.categories = this.categories.filter(cat => cat.id !== id)
    this.categoriesChanged.next(this.getCategory());
  }
}
