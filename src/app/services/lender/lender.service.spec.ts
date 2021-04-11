import { TestBed } from '@angular/core/testing';

import { LenderService } from './lender.service';

describe('LenderService', () => {
  let service: LenderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LenderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
