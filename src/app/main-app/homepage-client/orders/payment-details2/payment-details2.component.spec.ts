import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentDetails2Component } from './payment-details2.component';

describe('PaymentDetails2Component', () => {
  let component: PaymentDetails2Component;
  let fixture: ComponentFixture<PaymentDetails2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentDetails2Component]
    });
    fixture = TestBed.createComponent(PaymentDetails2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
