import { Injectable } from '@angular/core';
import { Subject, tap } from 'rxjs';

import { Movement } from '../models/movement.model';
import { DataStorageService } from './data-storage.service';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class TrashService {
  MovTrashChanged = new Subject<Movement[]>();
  private trash: Movement[] = [
    new Movement('Thu Oct 31 2024', 5000, 'Clothes', 'Diwali', '101'),
    new Movement('Mon Oct 21 2024', 500, 'Food', 'Dinner', '102'),
    new Movement('Mon Oct 21 2024', 5000, 'Shopping', 'Diwali', '103'),
  ];
  private catTrash: Category[] = [];

  // constructor(private dataStorageService: DataStorageService) {}

  getTrash() {
    return this.trash.slice();
  }

  /* fetchTrash() {
    return this.dataStorageService.fetchTrash().pipe(
      tap((movements: Movement[]) => {
        this.trash = movements;
        this.MovTrashChanged.next(this.getTrash());
      })
    );
  } */

  getTrashById(index: number) {
    return this.trash[index];
  }

  addMovement(movement: Movement) {
    this.trash.push(movement);
    // this.dataStorageService.addTrashinDB(movement);
    this.MovTrashChanged.next(this.getTrash());
  }

  removeMovement(id?: string) {
    this.trash = this.trash.filter(mov => mov.id !== id)
    this.MovTrashChanged.next(this.getTrash())
  }
}
