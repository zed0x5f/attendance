import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceReviewComponent } from './attendance-review.component';

describe('AttendanceReviewComponent', () => {
  let component: AttendanceReviewComponent;
  let fixture: ComponentFixture<AttendanceReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendanceReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
