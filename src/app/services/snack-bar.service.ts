import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor(private snackBar: MatSnackBar) {}

  showSuccess(message: string, duration: number = 3000) {
    this.snackBar.open(message, '', {
      duration,
      panelClass: ['snack-success'],
      verticalPosition: 'top',
    });
  }

  showError(message: string, duration: number = 3000) {
    this.snackBar.open(message, '', {
      duration,
      panelClass: ['snack-error'],
      verticalPosition: 'top',
    });
  }
}
