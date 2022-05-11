import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMemberModalComponent } from './create-member-modal.component';

describe('CreateMemberModalComponent', () => {
  let component: CreateMemberModalComponent;
  let fixture: ComponentFixture<CreateMemberModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateMemberModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMemberModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
