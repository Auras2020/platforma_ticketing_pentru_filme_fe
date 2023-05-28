import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionsDetailsComponent } from './promotions-details.component';

describe('PromotionsDetailsComponent', () => {
  let component: PromotionsDetailsComponent;
  let fixture: ComponentFixture<PromotionsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromotionsDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromotionsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
