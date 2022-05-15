import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberDietaryComponent } from './member-dietary.component';

describe('MemberDietaryComponent', () => {
  let component: MemberDietaryComponent;
  let fixture: ComponentFixture<MemberDietaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberDietaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberDietaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
