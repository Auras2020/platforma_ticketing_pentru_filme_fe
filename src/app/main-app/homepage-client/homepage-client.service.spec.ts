import { TestBed } from '@angular/core/testing';

import { HomepageClientService } from './homepage-client.service';

describe('HomepageClientService', () => {
  let service: HomepageClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomepageClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
