import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealFormTemplateDrivenComponent } from './meal-form-template-driven.component';

describe('MealFormTemplateDrivenComponent', () => {
  let component: MealFormTemplateDrivenComponent;
  let fixture: ComponentFixture<MealFormTemplateDrivenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MealFormTemplateDrivenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MealFormTemplateDrivenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
