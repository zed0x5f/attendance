import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealAttendanceComponent } from './meal-attendance.component';

describe('MealAttendanceComponent', () => {
  let component: MealAttendanceComponent;
  let fixture: ComponentFixture<MealAttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MealAttendanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MealAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
