import { TestBed } from '@angular/core/testing';

import { Statistics2Service } from './statistics2.service';

describe('Statistics2Service', () => {
  let service: Statistics2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Statistics2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
