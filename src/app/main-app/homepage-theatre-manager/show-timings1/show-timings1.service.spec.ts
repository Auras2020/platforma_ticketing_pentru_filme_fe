import { TestBed } from '@angular/core/testing';

import { ShowTimings1Service } from './show-timings1.service';

describe('ShowTimings1Service', () => {
  let service: ShowTimings1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowTimings1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
