import { EventEmitter, inject, Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updateProfile,
  User,
  user,
  verifyBeforeUpdateEmail,
} from '@angular/fire/auth';
import { BehaviorSubject, from, Observable } from 'rxjs';

import { CategoryService } from './category.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private firebaseAuth = inject(Auth);
  user$ = user(this.firebaseAuth);
  private uidSubject = new BehaviorSubject<string | null>(null);
  public uid$: Observable<string | null> = this.uidSubject.asObservable();
  addCatinDB = new EventEmitter<string>();

  constructor() {
    this.user$.subscribe((firebaseUser: User | null) => {
      if (firebaseUser) {
        this.uidSubject.next(firebaseUser.uid);
      } else {
        this.uidSubject.next(null);
      }
    });
  }

  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    ).then(() => { });

    return from(promise);
  }

  register(
    username: string,
    email: string,
    password: string
  ): Observable<void> {
    const promise = createUserWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    ).then((userCredentials) => {
      sendEmailVerification(userCredentials.user).then(() => {
      });

      this.addCatinDB.emit(userCredentials.user.uid);
      console.log(username)
      updateProfile(userCredentials.user, {
        displayName: username,
        photoURL:
          'https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png',
      });
    });
    return from(promise);
  }

  updateProfile(username: string, email: string) {
    this.user$.subscribe((user: User) => {
      updateProfile(user, { displayName: username });
      verifyBeforeUpdateEmail(user, email);
      updateEmail(user, email).then((resp) => {
        console.log(resp);
      })
    });
  }

  signOut(): Observable<void> {
    return from(signOut(this.firebaseAuth).then(() => { }));
  }
}
