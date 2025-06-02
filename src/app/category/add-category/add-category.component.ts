import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent {
  @Input() openPopup!: boolean
  @Output() closePopup = new EventEmitter<boolean>()

  fb = inject(FormBuilder)

  addCategory = this.fb.nonNullable.group({
    catName: ['', {
      validators: [Validators.required]
    }],
    type: ['expense'],
    color: ['#dc2626'],
    favourite: [false]
  })

  @Input() value!: string

  onSubmit() {
    const form = this.addCategory.getRawValue();
    const catNameField = this.addCategory.controls.catName

    console.log(form)
    if(catNameField.valid) {
      this.closePopup.emit()
    }
  }
  
}