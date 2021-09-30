import { TestBed } from '@angular/core/testing';

import { ExcelGetService } from './excel-get.service';

describe('ExcelGetService', () => {
  let service: ExcelGetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExcelGetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
