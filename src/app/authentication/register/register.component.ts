import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../services/authentication.service';
import { SnackBarService } from '../../services/snack-bar.service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  register!: FormGroup;
  isLoading = false;
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private snackBar: SnackBarService,
    private catService: CategoryService
  ) { }

  ngOnInit() {
    this.register = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
    this.catService.addInitialCategory();
  }

  onSubmit() {
    this.isLoading = true;
    const form = this.register.getRawValue();
    this.authService
      .register(form.username, form.email, form.password)
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.snackBar.showSuccess('Registered Successfully, Verify email before login');
          this.router.navigateByUrl('/login');
        },
        error: (err) => {
          this.isLoading = false;
          this.snackBar.showError(`Registration failed! ${err}`);
        },
      });
  }
}
