import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductsPromotionsComponent } from './add-products-promotions.component';

describe('AddProductsPromotionsComponent', () => {
  let component: AddProductsPromotionsComponent;
  let fixture: ComponentFixture<AddProductsPromotionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProductsPromotionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProductsPromotionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
