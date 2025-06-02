import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-restore-popup',
  templateUrl: './restore-popup.component.html',
  styleUrl: './restore-popup.component.css',
})
export class RestorePopupComponent {
  constructor(
    private ref: MatDialogRef<RestorePopupComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {}

  restore() {
    this.ref.close(true);
  }

  cancel() {
    this.ref.close();
  }
}
