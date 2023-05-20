import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookedProductsComponent } from './booked-products.component';

describe('BookedProductsComponent', () => {
  let component: BookedProductsComponent;
  let fixture: ComponentFixture<BookedProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookedProductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookedProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
