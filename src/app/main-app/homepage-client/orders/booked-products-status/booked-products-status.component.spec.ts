import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookedProductsStatusComponent } from './booked-products-status.component';

describe('BookedProductsStatusComponent', () => {
  let component: BookedProductsStatusComponent;
  let fixture: ComponentFixture<BookedProductsStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookedProductsStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookedProductsStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
