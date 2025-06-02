import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Movement } from '../../models/movement.model';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';
import { MovementService } from '../../services/movement.service';

@Component({
  selector: 'app-movement-popup',
  templateUrl: './movement-popup.component.html',
  styleUrl: './movement-popup.component.css',
  standalone: false,
})
export class MovementPopupComponent implements OnInit {
  title = 'Add Movement';
  today = new Date().toISOString().split('T')[0];
  movement!: Movement;
  editMode = false;
  index!: number;
  addMovement!: FormGroup;
  categories!: Category[];

  constructor(
    private ref: MatDialogRef<MovementPopupComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private movementService: MovementService,
    private categoryService: CategoryService
  ) {}

  private initForm() {
    console.log(this.ref);
    let date = this.today;
    let amount = '';
    let category = '';
    let note = '';

    this.categories = this.categoryService.getCategory();

    if (this.data) {
      this.index = this.data.index;
      this.movement = this.movementService.getMovementById(this.index);
      this.editMode = true;
      date = new Date(this.movement.date).toISOString().split('T')[0];
      amount = `${this.movement.amount}`;
      category = this.movement.category;
      note = this.movement.note;
    }
    this.addMovement = new FormGroup({
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
        new Date(form.date).toDateString(),
        form.amount,
        form.category,
        form.note
      );
      this.ref.close(newMovement);
      this.addMovement.reset();
    } else {
      // document.querySelector('#cat-name')?.classList.add('border-red-600');
    }
  }

  delete() {
    this.movementService.deleteMovement(this.index);
    this.closePopup();
  }

  closePopup() {
    this.ref.close();
    this.addMovement.reset();
  }
}
