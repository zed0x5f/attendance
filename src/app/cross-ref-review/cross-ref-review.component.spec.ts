import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrossRefReviewComponent } from './cross-ref-review.component';

describe('CrossRefReviewComponent', () => {
  let component: CrossRefReviewComponent;
  let fixture: ComponentFixture<CrossRefReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrossRefReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrossRefReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
