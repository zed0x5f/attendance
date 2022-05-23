import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceCrossRefComponent } from './attendance-cross-ref.component';

describe('AttendanceCrossRefComponent', () => {
  let component: AttendanceCrossRefComponent;
  let fixture: ComponentFixture<AttendanceCrossRefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendanceCrossRefComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceCrossRefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
