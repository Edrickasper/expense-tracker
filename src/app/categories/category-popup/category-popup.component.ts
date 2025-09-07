import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category-popup',
  templateUrl: './category-popup.component.html',
  styleUrl: './category-popup.component.css',
})
export class CategoryPopupComponent implements OnInit {
  category!: Category;
  editMode = false;
  index!: number;
  id!: string;
  addCategory!: FormGroup;
  title = 'Add Category';

  constructor(
    private ref: MatDialogRef<CategoryPopupComponent>,
    private categoryService: CategoryService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {}

  private initForm() {
    let name = '';
    let type = 'expense';
    let color = '#dc2626';
    let favourite = false;

    if (this.data) {
      this.editMode = true;
      this.index = this.data.index;
      this.category = this.categoryService.getCategoryById(this.index);
      name = this.category.name;
      type = this.category.type;
      color = this.category.color;
      favourite = this.category.favourite;
      this.id = this.category.id;
    }

    this.addCategory = new FormGroup({
      catName: new FormControl(name, [Validators.required]),
      type: new FormControl(type, [Validators.required]),
      color: new FormControl(color, [Validators.required]),
      favourite: new FormControl(favourite, [Validators.required]),
    });
  }

  ngOnInit() {
    this.initForm();
    if (this.editMode) this.title = 'Edit Category';
  }

  closePopup() {
    this.ref.close();
    this.addCategory.reset();
  }

  onSubmit() {
    const form = this.addCategory.getRawValue();

    if (this.addCategory.valid) {
      const newCategory = new Category(
        form.catName,
        form.type,
        form.color,
        form.favourite
      );
      this.ref.close(newCategory);
      this.addCategory.reset();
    } else {
      document.querySelector('#cat-name')?.classList.add('border-red-600');
    }
  }

  delete() {
    this.categoryService.deleteCategory(this.index);
    this.closePopup();
  }
}
