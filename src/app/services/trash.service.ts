import { Injectable } from '@angular/core';
import { Subject, tap } from 'rxjs';

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
  private trashedCategory: Category[] = [];

  constructor(private dataStorageService: DataStorageService) { }

  getTrashedMovement() {
    return this.trashedMovement.slice();
  }

  getTrashedCategory() {
    return this.trashedCategory.slice();
  }

  onFetchMovTrash() {
    return this.dataStorageService.fetchMovTrash().pipe(
      tap((movements: Movement[]) => {
        this.trashedMovement = movements;
        this.trashedMovementChanged.next(this.getTrashedMovement());
      })
    );
  }

  onFetchCatTrash() {
    return this.dataStorageService.fetchCatTrash().pipe(
      tap((categories: Category[]) => {
        this.trashedCategory = categories;
        this.trashedCategoryChanged.next(this.getTrashedCategory());
      })
    );
  }

  addMovement(movement: Movement) {
    this.dataStorageService.trashMov(movement)
    this.onFetchMovTrash();
  }

  removeMovement(movement: Movement) {
    this.dataStorageService.removeTrashedMov(movement)
    this.onFetchMovTrash();
  }

  addCategory(cat: Category) {
    this.dataStorageService.trashCat(cat);
    this.onFetchCatTrash();
  }

  removeCategory(cat: Category) {
    this.dataStorageService.removeTrashedCat(cat);
    this.onFetchCatTrash();
  }

  clearTrash() {
    this.trashedMovement = [];
    this.trashedCategory = [];
    this.trashedMovementChanged.next(this.getTrashedMovement())
    this.trashedCategoryChanged.next(this.getTrashedCategory());
  }
}
