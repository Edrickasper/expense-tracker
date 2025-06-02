import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../services/authentication.service';
import { SnackBarService } from '../../services/snack-bar.service';
import { verifyBeforeUpdateEmail } from '@angular/fire/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  standalone: false,
})
export class RegisterComponent {
  register!: FormGroup;
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private snackBar: SnackBarService
  ) {}

  ngOnInit() {
    this.register = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    const form = this.register.getRawValue();
    this.authService
      .register(form.username, form.email, form.password)
      .subscribe({
        next: () => {
          this.snackBar.showSuccess('Registered Successfully');
          this.router.navigateByUrl('/');
        },
        error: (err) => {
          this.snackBar.showError(`Registration failed! ${err}`);
        },
      });
  }
}
