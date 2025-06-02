import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Category } from '../models/category.model';

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

  getCategory() {
    return this.categories.slice();
  }

  updateCategory(index: number, category: Category) {
    this.categories[index] = category;
    this.categoriesChanged.next(this.getCategory());
  }

  addCategory(category: Category) {
    this.categories.push(category);
    this.categoriesChanged.next(this.getCategory());
  }

  getCategoryById(id: number) {
    return this.categories[id];
  }

  deleteCategory(index: number) {
    this.categories.splice(index, 1);
    this.categoriesChanged.next(this.getCategory());
  }
}
