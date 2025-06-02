import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovementPopupComponent } from './movement-popup.component';

describe('MovementPopupComponent', () => {
  let component: MovementPopupComponent;
  let fixture: ComponentFixture<MovementPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovementPopupComponent], // Declare the component
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovementPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
