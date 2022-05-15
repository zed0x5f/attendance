import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportReservationsComponent } from './import-reservations.component';

describe('ImportReservationsComponent', () => {
  let component: ImportReservationsComponent;
  let fixture: ComponentFixture<ImportReservationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportReservationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
