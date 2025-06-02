import { inject, Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updateProfile,
  User,
  user,
  verifyBeforeUpdateEmail,
} from '@angular/fire/auth';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private firebaseAuth = inject(Auth);
  user$ = user(this.firebaseAuth);
  curUser!: User;

  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    ).then((res) => {
      console.log();
    });

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
    ).then((userCredentials) =>
      updateProfile(userCredentials.user, {
        displayName: username,
        photoURL:
          'https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png',
      })
    );
    return from(promise);
  }

  updateProfile(username: string, email: string) {
    updateProfile(this.curUser, { displayName: username });
    verifyBeforeUpdateEmail(this.curUser, email);
    updateEmail(this.curUser, email).then((resp) => {
      console.log(resp);
    });
  }

  signOut(): Observable<void> {
    const promise = signOut(this.firebaseAuth).then(() => {});
    return from(promise);
  }
}
