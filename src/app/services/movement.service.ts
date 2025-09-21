import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Movement } from '../models/movement.model';
import { DataStorageService } from './data-storage.service';

@Injectable({
  providedIn: 'root',
})
export class MovementService {
  constructor(private dataStorageService: DataStorageService) { }

  movementsChanged = new Subject<Movement[]>();

  private movements: Movement[] = [
    new Movement('Diwali', 'Thu Oct 31 2024', 5000, 'Clothes', 'Diwali', '101'),
    new Movement('Dinner', 'Mon Oct 21 2024', 500, 'Food', 'Dinner', '102'),
    new Movement('Diwali', 'Mon Oct 21 2024', 5000, 'Shopping', 'Diwali', '103'),
  ];

  onFetchMovement() {
    return this.dataStorageService.fetchMovements().pipe(
      tap((movements: Movement[]) => {
        this.movements = movements;
        this.movementsChanged.next(this.getMovements());
      })
    );
  }

  getMovements() {
    return this.movements.slice();
  }

  getMovementById(index: number) {
    return this.movements[index];
  }

  addMovement(movement: Movement) {
    this.dataStorageService.addMovementinDB(movement);
    this.onFetchMovement();
  }

  updateMovement(movement: Movement) {
    this.dataStorageService.updateMovementinDB(movement);
    this.onFetchMovement();
  }

  deleteMovementsByCategory(category: string) {
    const toTrash = this.movements.filter(m => m.category === category)
    toTrash.forEach((mov) => {
      this.removeMovement(mov);
    })
    this.onFetchMovement();
    return toTrash
  }

  removeMovement(movement: Movement) {
    this.dataStorageService.deleteMovementinDB(movement);
    this.onFetchMovement();
  }
}
