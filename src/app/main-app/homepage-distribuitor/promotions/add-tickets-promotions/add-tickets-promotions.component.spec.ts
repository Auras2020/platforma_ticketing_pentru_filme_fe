import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTicketsPromotionsComponent } from './add-tickets-promotions.component';

describe('AddTicketsPromotionsComponent', () => {
  let component: AddTicketsPromotionsComponent;
  let fixture: ComponentFixture<AddTicketsPromotionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTicketsPromotionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTicketsPromotionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
