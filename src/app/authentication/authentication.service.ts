import { inject, Injectable } from "@angular/core";
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "@angular/fire/auth";
import { from, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class AuthenticationService {
    firebaseAuth = inject(Auth)
    Loggedin:boolean = true

    login(email: string, password: string): Observable<void> {
        const promise = signInWithEmailAndPassword(this.firebaseAuth, email, password)
        .then(() => {});
        this.Loggedin = true
        return from(promise);

    }

    register(username: string, email: string, password: string): Observable<void> {
        const promise = createUserWithEmailAndPassword(this.firebaseAuth, email, password)
        .then((response) => updateProfile(response.user, { displayName: username }),);
        return from(promise);
    }
}