import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';

import { AuthenticationService } from '../../services/authentication.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css',
})
export class EditProfileComponent implements OnInit {
  constructor(private authService: AuthenticationService) {}

  profile!: FormGroup;
  user!: User | null;

  ngOnInit() {
    this.onInit();
    this.authService.user$.subscribe({
      next: (user: any) => {
        if (user) {
          this.user = user;
        }
      },
    });
  }

  onInit() {
    this.profile = new FormGroup({
      name: new FormControl(this.user?.displayName, [Validators.required]),
      email: new FormControl(this.user?.email, [Validators.required]),
      phoneNo: new FormControl(this.user?.phoneNumber),
    });
  }

  verifyEmail() {}

  onSubmit() {
    const form = this.profile.getRawValue();
    console.log(form);
    this.authService.updateProfile(form.name, form.email);
  }
}
