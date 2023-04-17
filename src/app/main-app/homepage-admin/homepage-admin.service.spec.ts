import { TestBed } from '@angular/core/testing';

import { HomepageAdminService } from './homepage-admin.service';

describe('HomepageAdminService', () => {
  let service: HomepageAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomepageAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
