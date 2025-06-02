import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../services/authentication.service';
import { SnackBarService } from '../../services/snack-bar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: false,
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private snackBar: SnackBarService
  ) {}
  login!: FormGroup;
  isLoading = false;

  ngOnInit() {
    this.login = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    this.isLoading = true;
    const form = this.login.getRawValue();
    this.authService.login(form.email, form.password).subscribe({
      next: () => {
        this.isLoading = false;
        this.snackBar.showSuccess('Login successful!');
        this.router.navigateByUrl('/categories');
      },
      error: (err) => {
        this.isLoading = false;
        this.snackBar.showError(`Login failed! ${err}`);
      },
    });
  }
}
