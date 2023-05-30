import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteProductsPromotionsComponent } from './delete-products-promotions.component';

describe('DeleteProductsPromotionsComponent', () => {
  let component: DeleteProductsPromotionsComponent;
  let fixture: ComponentFixture<DeleteProductsPromotionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteProductsPromotionsComponent]
    });
    fixture = TestBed.createComponent(DeleteProductsPromotionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
