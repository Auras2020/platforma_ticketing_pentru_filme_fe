import { TestBed } from '@angular/core/testing';

import { FeedbackToolbarService } from './feedback-toolbar.service';

describe('FeedbackToolbarService', () => {
  let service: FeedbackToolbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeedbackToolbarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
