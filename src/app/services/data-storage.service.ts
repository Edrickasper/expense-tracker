import { Injectable } from '@angular/core';
import {
  collection,
  Firestore,
  addDoc,
  collectionData,
  deleteDoc,
  doc,
  updateDoc,
  CollectionReference,
  DocumentData,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { Movement } from '../models/movement.model';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  private movementCollection!: CollectionReference<DocumentData>;
  constructor(
    private firestore: Firestore,
    private authService: AuthenticationService
  ) {}

  addMovement(movement: Movement) {
    return addDoc(this.movementCollection, { ...movement });
  }

  fetchMovements(): Observable<Movement[]> {
    return collectionData(this.movementCollection, {
      idField: 'id',
    }) as Observable<Movement[]>;
  }

  deleteMovement(id: string) {
    const movementDoc = doc(this.firestore, `movements/${id}`);
    return deleteDoc(movementDoc);
  }

  updateMovement(id: string, movement: Movement) {
    const movementDoc = doc(this.firestore, `movements/${id}`);
    return updateDoc(movementDoc, { ...movement });
  }
}
