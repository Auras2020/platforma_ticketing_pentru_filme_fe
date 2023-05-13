import { TestBed } from '@angular/core/testing';

import { VenueSeats1Service } from './venue-seats1.service';

describe('VenueSeats1Service', () => {
  let service: VenueSeats1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VenueSeats1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
