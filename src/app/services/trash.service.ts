import { Injectable } from '@angular/core';
import { Subject, tap } from 'rxjs';

import { Movement } from '../models/movement.model';
import { DataStorageService } from './data-storage.service';

@Injectable({
  providedIn: 'root',
})
export class TrashService {
  trashChanged = new Subject<Movement[]>();
  private trash: Movement[] = [];

  constructor(private dataStorageService: DataStorageService) {}

  getTrash() {
    return this.trash.slice();
  }

  fetchTrash() {
    return this.dataStorageService.fetchTrash().pipe(
      tap((movements: Movement[]) => {
        this.trash = movements;
        this.trashChanged.next(this.getTrash());
      })
    );
  }

  getTrashById(index: number) {
    return this.trash[index];
  }

  addTrash(movement: Movement) {
    this.trash.push(movement);
    this.dataStorageService.addTrashinDB(movement);
    this.trashChanged.next(this.getTrash());
  }

  deleteMovement(index: number, movement: Movement) {
    this.trash.splice(index, 1);
    this.dataStorageService.deleteTrashinDB(movement);
    this.trashChanged.next(this.getTrash());
  }
}
