import { TestBed } from '@angular/core/testing';

import { Dashboard1Service } from './dashboard1.service';

describe('Dashboard1Service', () => {
  let service: Dashboard1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Dashboard1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
