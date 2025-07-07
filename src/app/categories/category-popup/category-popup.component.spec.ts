import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryPopupComponent } from './category-popup.component';

describe('CategoryPopupComponent', () => {
  let component: CategoryPopupComponent;
  let fixture: ComponentFixture<CategoryPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoryPopupComponent], // Declare the component
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
