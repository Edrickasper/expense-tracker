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

  ngOnInit() {
    this.login = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    const form = this.login.getRawValue();
    this.authService.login(form.email, form.password).subscribe({
      next: () => {
        this.snackBar.showSuccess('Login successful!');
        this.router.navigateByUrl('/categories');
      },
      error: (err) => {
        this.snackBar.showError(`Login failed! ${err}`);
      },
      complete: () => {
        console.log('completed');
      },
    });
  }
}
