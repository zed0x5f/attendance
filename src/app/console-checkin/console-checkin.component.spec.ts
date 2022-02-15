import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsoleCheckinComponent } from './console-checkin.component';

describe('ConsoleCheckinComponent', () => {
  let component: ConsoleCheckinComponent;
  let fixture: ComponentFixture<ConsoleCheckinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsoleCheckinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsoleCheckinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
