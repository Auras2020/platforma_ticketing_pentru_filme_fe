import { TestBed } from '@angular/core/testing';

import { Movies1Service } from './movies1.service';

describe('Movies1Service', () => {
  let service: Movies1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Movies1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
