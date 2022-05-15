import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceReviewCellComponent } from './attendance-review-cell.component';

describe('AttendanceReviewCellComponent', () => {
  let component: AttendanceReviewCellComponent;
  let fixture: ComponentFixture<AttendanceReviewCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendanceReviewCellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceReviewCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
