import { TestBed } from '@angular/core/testing';

import { MyFirebaseServiceService } from './my-firebase-service.service';

describe('MyFirebaseServiceService', () => {
  let service: MyFirebaseServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyFirebaseServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
