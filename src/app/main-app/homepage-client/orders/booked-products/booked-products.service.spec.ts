import { TestBed } from '@angular/core/testing';

import { BookedProductsService } from './booked-products.service';

describe('BookedProductsService', () => {
  let service: BookedProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookedProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
