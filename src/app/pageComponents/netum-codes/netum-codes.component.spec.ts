import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetumCodesComponent } from './netum-codes.component';

describe('NetumCodesComponent', () => {
  let component: NetumCodesComponent;
  let fixture: ComponentFixture<NetumCodesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NetumCodesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NetumCodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
