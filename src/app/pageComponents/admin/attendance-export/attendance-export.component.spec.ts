import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceExportComponent } from './attendance-export.component';

describe('AttendanceExportComponent', () => {
  let component: AttendanceExportComponent;
  let fixture: ComponentFixture<AttendanceExportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendanceExportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
