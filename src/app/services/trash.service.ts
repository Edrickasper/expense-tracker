import { Injectable } from '@angular/core';
import { retry, Subject, tap } from 'rxjs';

import { Movement } from '../models/movement.model';
import { DataStorageService } from './data-storage.service';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class TrashService {
  trashedMovementChanged = new Subject<Movement[]>();
  trashedCategoryChanged = new Subject<Category[]>();
  private trashedMovement: Movement[] = [];
  private trashedCategory: Category[] = [
    new Category('Food', 'expense', '#dc2626', false, '101'),
    new Category('Clothes', 'expense', '#dc2626', true, '102'),
    new Category('Salary', 'income', '#dc2626', false, '103'),
  ];

  // constructor(private dataStorageService: DataStorageService) {}

  getTrashedMovement() {
    return this.trashedMovement.slice();
  }

  getTrashedCategory() {
    return this.trashedCategory.slice();
  }

  /* fetchTrash() {
    return this.dataStorageService.fetchTrash().pipe(
      tap((movements: Movement[]) => {
        this.trash = movements;
        this.movTrashChanged.next(this.getTrashedMovement());
      })
    );
  } */

  addMovement(movement: Movement) {
    this.trashedMovement.push(movement);
    this.trashedMovementChanged.next(this.getTrashedMovement());
  }

  removeMovement(id?: string) {
    this.trashedMovement = this.trashedMovement.filter(mov => mov.id !== id)
    this.trashedMovementChanged.next(this.getTrashedMovement())
  }

  addCategory(cat: Category) {
    this.trashedCategory.push(cat);
    this.trashedCategoryChanged.next(this.getTrashedCategory());
  }

  removeCategory(id?: string) {
    this.trashedCategory = this.trashedCategory.filter(cat => cat.id !== id)
    this.trashedCategoryChanged.next(this.getTrashedCategory());
  }

  clearTrash() {
    this.trashedMovement = [];
    this.trashedCategory = [];
    this.trashedMovementChanged.next(this.getTrashedMovement())
    this.trashedCategoryChanged.next(this.getTrashedCategory());
  }
}
