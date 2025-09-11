import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription, take } from 'rxjs';

import { MovementPopupComponent } from './movement-popup/movement-popup.component';
import { Movement } from '../models/movement.model';
import { MovementService } from '../services/movement.service';
import { SnackBarService } from '../services/snack-bar.service';

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrl: './movements.component.css',
})
export class MovementsComponent implements OnInit {
  isLoading: boolean = false;
  constructor(
    private movementService: MovementService,
    private dialog: MatDialog,
    private snackBar: SnackBarService
  ) { }

  ngOnInit() {
    // this.isLoading = true;
    // this.movementService
    //   .onFetchMovement()
    //   .pipe(take(1))
    //   .subscribe({
    //     next: () => {
    //       this.isLoading = false;
    //     },
    //     error: (err) => {
    //       this.isLoading = false;
    //       this.snackBar.showError(err);
    //     },
    //   });
  }

  openPopup() {
    const popup = this.dialog.open(MovementPopupComponent, {
      disableClose: true,
      width: '60%',
      height: 'auto',
    });
    popup.afterClosed().subscribe((movement: Movement) => {
      if (movement) this.movementService.addMovement(movement);
    });
  }
}
