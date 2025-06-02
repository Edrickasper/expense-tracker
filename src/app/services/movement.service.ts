import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Movement } from '../models/movement.model';
import { DataStorageService } from './data-storage.service';

@Injectable({
  providedIn: 'root',
})
export class MovementService {
  constructor(private dataStorageService: DataStorageService) {}

  movementsChanged = new Subject<Movement[]>();
  trashChanged = new Subject<Movement[]>();

  private movements: Movement[] = [
    /* new Movement('Thu Oct 31 2024', 5000, 'Clothes', 'Diwali'),
    new Movement('Mon Oct 21 2024', 500, 'Food', 'Dinner'),
    new Movement('Mon Oct 21 2024', 5000, 'Shopping', 'Diwali'), */
  ];

  private trash: Movement[] = [
    new Movement('Mon Oct 21 2024', 5000, 'Travel', 'Diwali'),
  ];

  buildMovementDates(movements: Movement[]) {
    let movementDates = [];
    let prevDate = '';
    for (let movement of movements) {
      if (prevDate !== movement.date) {
        movementDates.push(true);
        prevDate = movement.date;
      } else {
        movementDates.push(false);
      }
    }
    return movementDates;
  }

  onFetchMovement() {
    return this.dataStorageService.fetchMovements().pipe<Movement[]>(
      tap((movements) => {
        this.movements = movements;
      })
    );
  }

  getmovements() {
    return this.movements.slice();
  }

  getMovementById(index: number) {
    return this.movements[index];
  }

  addMovement(movement: Movement) {
    this.movements.push(movement);
    this.dataStorageService.addMovement(movement);
    this.movementsChanged.next(this.getmovements());
  }

  updateMovement(index: number, movement: Movement) {
    this.movements[index] = movement;
    this.movementsChanged.next(this.getmovements());
  }

  // Trash
  getTrash() {
    return this.trash.slice();
  }

  getTrashById(index: number) {
    return this.trash[index];
  }

  deleteMovement(index: number) {
    let movement = this.getMovementById(index);
    this.trash.push(movement);
    this.movements.splice(index, 1);
    this.movementsChanged.next(this.getmovements());
    this.trashChanged.next(this.getTrash());
  }

  restoreMovement(index: number) {
    let movement = this.getTrashById(index);
    this.movements.push(movement);
    this.trash.splice(index, 1);
    this.movementsChanged.next(this.getmovements());
    this.trashChanged.next(this.getTrash());
  }
}
