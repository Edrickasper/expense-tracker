import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  fb = inject(FormBuilder)
  authService = inject(AuthenticationService)
  router = inject(Router)

  login = this.fb.nonNullable.group({
    email: ['', {
      validators: [Validators.required, Validators.email]
    }],
    password: ['', {
      validators: [Validators.required]
    }]
  })

  onSubmit() {
    const form = this.login.getRawValue();
    this.authService
    .login(form.email, form.password)
    .subscribe({
      next: () => {
        this.router.navigateByUrl('/categories')
      }
    })
  }
}
