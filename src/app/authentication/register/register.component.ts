import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  fb = inject(FormBuilder)
  http = inject(HttpClient)
  authService = inject(AuthenticationService)
  router = inject(Router)

  register = this.fb.nonNullable.group({
    username: ['', {
      validators: [Validators.required]
    }],
    email: ['', {
      validators: [Validators.required, Validators.email]
    }],
    password: ['', {
      validators: [Validators.required]
    }]
  })

  onSubmit() {
    const form = this.register.getRawValue();
    this.authService
    .register(form.username, form.email, form.password)
    .subscribe({
      next: () => {
        this.router.navigateByUrl('/')
      }
    })
  }
}
