import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookedProductsDetailsComponent } from './booked-products-details.component';

describe('BookedProductsDetailsComponent', () => {
  let component: BookedProductsDetailsComponent;
  let fixture: ComponentFixture<BookedProductsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookedProductsDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookedProductsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
