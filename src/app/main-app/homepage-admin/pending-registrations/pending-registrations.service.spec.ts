import { TestBed } from '@angular/core/testing';

import { PendingRegistrationsService } from './pending-registrations.service';

describe('PendingRegistrationsService', () => {
  let service: PendingRegistrationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PendingRegistrationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
