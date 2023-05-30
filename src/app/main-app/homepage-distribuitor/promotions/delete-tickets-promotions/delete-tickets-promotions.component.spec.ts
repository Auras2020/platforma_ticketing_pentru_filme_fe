import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTicketsPromotionsComponent } from './delete-tickets-promotions.component';

describe('DeleteTicketsPromotionsComponent', () => {
  let component: DeleteTicketsPromotionsComponent;
  let fixture: ComponentFixture<DeleteTicketsPromotionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteTicketsPromotionsComponent]
    });
    fixture = TestBed.createComponent(DeleteTicketsPromotionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
