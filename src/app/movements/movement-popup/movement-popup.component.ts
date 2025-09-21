import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Movement } from '../../models/movement.model';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';
import { MovementService } from '../../services/movement.service';
import { TrashService } from '../../services/trash.service';

@Component({
  selector: 'app-movement-popup',
  templateUrl: './movement-popup.component.html',
  styleUrl: './movement-popup.component.css',
})
export class MovementPopupComponent implements OnInit {
  title = 'Add Movement';
  today = new Date().toISOString().split('T')[0];
  movement!: Movement;
  editMode = false;
  index!: number;
  id?: string;
  addMovement!: FormGroup;
  categories!: Category[];

  constructor(
    private ref: MatDialogRef<MovementPopupComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private movementService: MovementService,
    private categoryService: CategoryService,
    private trashService: TrashService
  ) { }

  private initForm() {
    let date = this.today;
    let amount = '';
    let category = '';
    let note = '';
    let purpose = '';
    this.id = '';

    this.categoryService.onFetchCategory().subscribe({
      next: (cat) => {
        this.categories = cat
      }
    });

    if (this.data) {
      this.index = this.data.index;
      this.editMode = true;
      this.movement = this.movementService.getMovementById(this.index);
      purpose = this.movement.purpose;
      date = new Date(this.movement.date).toISOString().split('T')[0];
      amount = `${this.movement.amount}`;
      category = this.movement.category;
      note = this.movement.note ? this.movement.note : '';
      this.id = this.movement.id;
      console.log(this.id)
    }
    this.addMovement = new FormGroup({
      purpose: new FormControl(purpose, [Validators.required]),
      date: new FormControl(date, [Validators.required]),
      amount: new FormControl(amount, [Validators.required]),
      category: new FormControl(category, [Validators.required]),
      note: new FormControl(note),
    });
  }

  ngOnInit() {
    this.initForm();
    if (this.editMode) this.title = 'Edit Movement';
  }

  onSubmit() {
    const form = this.addMovement.getRawValue();

    if (this.addMovement.valid) {
      const newMovement = new Movement(
        form.purpose,
        new Date(form.date).toDateString(),
        form.amount,
        form.category,
        form.note
      );
      newMovement.id = this.id;
      this.ref.close(newMovement);
      this.addMovement.reset();
    }
  }

  trash() {
    this.movementService.removeMovement(this.movement);
    this.trashService.addMovement(this.movement);
    this.closePopup();
  }

  closePopup() {
    this.ref.close();
    this.addMovement.reset();
  }
}
