import { TestBed } from '@angular/core/testing';

import { HomepageDistribuitorService } from './homepage-distribuitor.service';

describe('HomepageDistribuitorService', () => {
  let service: HomepageDistribuitorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomepageDistribuitorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
