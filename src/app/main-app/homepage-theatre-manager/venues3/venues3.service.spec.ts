import { TestBed } from '@angular/core/testing';

import { Venues3Service } from './venues3.service';

describe('Venues3Service', () => {
  let service: Venues3Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Venues3Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
