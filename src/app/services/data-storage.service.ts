import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collectionData,
  deleteDoc,
  doc,
  updateDoc,
  collection,
  setDoc,
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
  ) { }

  /* --------------------------------------------------------------------------------------------- */
  // Data fetching
  /* --------------------------------------------------------------------------------------------- */
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

  fetchMovTrash(): Observable<Movement[]> {
    return this.authService.uid$.pipe(
      filter((uid): uid is string => !!uid),
      take(1),
      switchMap((uid: string) => {
        const trashCollection = collection(
          this.firestore,
          `users/${uid}/trash_movements`
        );
        return collectionData(trashCollection, {
          idField: 'id',
        }) as Observable<Movement[]>;
      })
    );
  }

  fetchCatTrash(): Observable<Category[]> {
    return this.authService.uid$.pipe(
      filter((uid): uid is string => !!uid),
      take(1),
      switchMap((uid: string) => {
        const trashCollection = collection(
          this.firestore,
          `users/${uid}/trash_category`
        );
        return collectionData(trashCollection, {
          idField: 'id',
        }) as Observable<Category[]>;
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

  /* ----------------------------------------------------------------------------------------------------- */
  // movements
  /* ----------------------------------------------------------------------------------------------------- */
  addMovementinDB(movement: Movement) {
    this.authService.uid$.pipe(take(1)).subscribe((uid) => {
      const movementCollection = collection(
        this.firestore,
        `users/${uid}/movements`
      );
      const { id, ...movementData } = movement;
      console.log(id)
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

  /* ------------------------------------------------------------------------------------------------- */
  // Categories
  /* ------------------------------------------------------------------------------------------------- */
  addCategoryinDB(category: Category) {
    this.authService.uid$.pipe(take(1)).subscribe((uid) => {
      const categoryRef = doc(collection(this.firestore, `users/${uid}/categories`));
      const id = categoryRef.id;
      const categoryData = { ...category, id };
      console.log(categoryData)
      setDoc(categoryRef, categoryData);
    });
  }

  updateCategoryinDB(category: Category) {
    this.authService.uid$.pipe(take(1)).subscribe((uid) => {
      console.log(category)
      const { id, ...categoryData } = category;
      console.log(id)
      const movementDoc = doc(this.firestore, `users/${uid}/categories/${id}`);
      return updateDoc(movementDoc, { ...categoryData });
    });
  }

  deleteCategoryinDB(category: Category) {
    this.authService.uid$.pipe(take(1)).subscribe((uid) => {
      const deleteCat = doc(
        this.firestore,
        `users/${uid}/categories/${category.id}`
      );
      deleteDoc(deleteCat);
    });
  }

  /* ------------------------------------------------------------------------------------ */
  // Trash
  /* ------------------------------------------------------------------------------------ */
  trashMov(movement: Movement) {
    this.authService.uid$.pipe(take(1)).subscribe((uid) => {
      const trashMov = collection(this.firestore, `users/${uid}/trash_movements`);
      const { id, ...movementData } = movement;
      addDoc(trashMov, { ...movementData });
    });
  }

  removeTrashedMov(movement: Movement) {
    this.authService.uid$.pipe(take(1)).subscribe((uid) => {
      const deleteMov = doc(
        this.firestore,
        `users/${uid}/trash_movements/${movement.id}`
      );
      deleteDoc(deleteMov);
    });
  }

  trashCat(cat: Category) {
    this.authService.uid$.pipe(take(1)).subscribe((uid) => {
      const trashCat = collection(this.firestore, `users/${uid}/trash_category`);
      const { id, ...categoryData } = cat;
      addDoc(trashCat, { ...categoryData });
    });
  }

  removeTrashedCat(category: Category) {
    this.authService.uid$.pipe(take(1)).subscribe((uid) => {
      const deleteCat = doc(
        this.firestore,
        `users/${uid}/trash_category/${category.id}`
      );
      deleteDoc(deleteCat);
    });
  }
}
