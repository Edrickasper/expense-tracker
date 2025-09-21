import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthenticationService } from "../services/authentication.service";
import { map, take } from "rxjs";

@Injectable({ providedIn: 'root' })
export class GuestGuard implements CanActivate {
    constructor(private authService: AuthenticationService, private router: Router) { }

    canActivate() {
        return this.authService.user$.pipe(
            take(1),
            map(user => {
                if (user) {
                    this.router.navigate(['/']); // redirect to dashboard/home
                    return false;
                }
                return true; // allow access if not logged in
            })
        );
    }
}
