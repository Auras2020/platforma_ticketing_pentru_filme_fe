import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueSeats3Component } from './venue-seats3.component';

describe('VenueSeats3Component', () => {
  let component: VenueSeats3Component;
  let fixture: ComponentFixture<VenueSeats3Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VenueSeats3Component]
    });
    fixture = TestBed.createComponent(VenueSeats3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
