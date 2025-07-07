import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collectionData,
  deleteDoc,
  doc,
  updateDoc,
  collection,
} from '@angular/fire/firestore';
import { filter, Observable, switchMap, take } from 'rxjs';

import { Movement } from '../models/movement.model';
import { AuthenticationService } from './authentication.service';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private firestore: Firestore,
    private authService: AuthenticationService
  ) {}

  // Data fetching
  fetchMovements(): Observable<Movement[]> {
    return this.authService.uid$.pipe(
      filter((uid): uid is string => !!uid),
      take(1),
      switchMap((uid: string) => {
        const movementCollection = collection(
          this.firestore,
          `users/${uid}/movements`
        );
        return collectionData(movementCollection, {
          idField: 'id',
        }) as Observable<Movement[]>;
      })
    );
  }

  fetchTrash(): Observable<Movement[]> {
    return this.authService.uid$.pipe(
      filter((uid): uid is string => !!uid),
      take(1),
      switchMap((uid: string) => {
        const trashCollection = collection(
          this.firestore,
          `users/${uid}/trash`
        );
        return collectionData(trashCollection, {
          idField: 'id',
        }) as Observable<Movement[]>;
      })
    );
  }

  fetchCategory(): Observable<Category[]> {
    return this.authService.uid$.pipe(
      filter((uid): uid is string => !!uid),
      take(1),
      switchMap((uid: string) => {
        const categoryCollection = collection(
          this.firestore,
          `users/${uid}/categories`
        );
        return collectionData(categoryCollection, {
          idField: 'id',
        }) as Observable<Category[]>;
      })
    );
  }

  // Updating DB according to user operations

  // movements & trash
  addMovementinDB(movement: Movement) {
    this.authService.uid$.pipe(take(1)).subscribe((uid) => {
      const movementCollection = collection(
        this.firestore,
        `users/${uid}/movements`
      );
      const { id, ...movementData } = movement;
      return addDoc(movementCollection, { ...movementData });
    });
  }

  updateMovementinDB(movement: Movement) {
    this.authService.uid$.pipe(take(1)).subscribe((uid) => {
      const { id, ...movementData } = movement;
      const movementDoc = doc(this.firestore, `users/${uid}/movements/${id}`);
      return updateDoc(movementDoc, { ...movementData });
    });
  }

  deleteMovementinDB(movement: Movement) {
    this.authService.uid$.pipe(take(1)).subscribe((uid) => {
      const deleteMov = doc(
        this.firestore,
        `users/${uid}/movements/${movement.id}`
      );
      deleteDoc(deleteMov);
    });
  }

  addTrashinDB(movement: Movement) {
    this.authService.uid$.pipe(take(1)).subscribe((uid) => {
      const trashMov = collection(this.firestore, `users/${uid}/trash`);
      const { id, ...movementData } = movement;
      addDoc(trashMov, { ...movementData });
    });
  }

  deleteTrashinDB(movement: Movement) {
    this.authService.uid$.pipe(take(1)).subscribe((uid) => {
      const deleteMov = doc(
        this.firestore,
        `users/${uid}/trash/${movement.id}`
      );
      deleteDoc(deleteMov);
    });
  }

  // Categories
  initialCategories(uid: string, category: Category) {
    const categoryCollection = collection(
      this.firestore,
      `users/${uid}/categories`
    );
    const { id, ...categoryData } = category;
    return addDoc(categoryCollection, { ...categoryData });
  }

  addCategoryinDB(category: Category) {
    this.authService.uid$.pipe(take(1)).subscribe((uid) => {
      const categoryCollection = collection(
        this.firestore,
        `users/${uid}/categories`
      );
      const { id, ...categoryData } = category;
      return addDoc(categoryCollection, { ...categoryData });
    });
  }

  updateCategoryinDB(category: Category) {
    this.authService.uid$.pipe(take(1)).subscribe((uid) => {
      const { id, ...categoryData } = category;
      const movementDoc = doc(this.firestore, `users/${uid}/categories/${id}`);
      return updateDoc(movementDoc, { ...categoryData });
    });
  }
}
