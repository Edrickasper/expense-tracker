import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Movement } from '../models/movement.model';
import { DataStorageService } from './data-storage.service';

@Injectable({
  providedIn: 'root',
})
export class MovementService {
  // constructor(private dataStorageService: DataStorageService) { }

  movementsChanged = new Subject<Movement[]>();

  private movements: Movement[] = [
    new Movement('Thu Oct 31 2024', 5000, 'Clothes', 'Diwali', '101'),
    new Movement('Mon Oct 21 2024', 500, 'Food', 'Dinner', '102'),
    new Movement('Mon Oct 21 2024', 5000, 'Shopping', 'Diwali', '103'),
  ];
  /* 
    onFetchMovement() {
      return this.dataStorageService.fetchMovements().pipe(
        tap((movements: Movement[]) => {
          this.movements = movements;
          this.movementsChanged.next(this.getmovements());
        })
      );
    } */

  getmovements() {
    return this.movements.slice();
  }

  getMovementById(index: number) {
    return this.movements[index];
  }

  addMovement(movement: Movement) {
    this.movements.push(movement);
    // this.dataStorageService.addMovementinDB(movement);
    this.movementsChanged.next(this.getmovements());
  }

  updateMovement(index: number, movement: Movement) {
    this.movements[index] = movement;
    // this.dataStorageService.updateMovementinDB(movement);
    this.movementsChanged.next(this.getmovements());
  }

  trashMovement(index: number, movement: Movement) {
    // this.dataStorageService.deleteMovementinDB(movement);
    this.movements.splice(index, 1);
    this.movementsChanged.next(this.getmovements());
  }
}
