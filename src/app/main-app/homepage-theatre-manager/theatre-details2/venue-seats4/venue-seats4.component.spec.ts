import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueSeats4Component } from './venue-seats4.component';

describe('VenueSeats4Component', () => {
  let component: VenueSeats4Component;
  let fixture: ComponentFixture<VenueSeats4Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VenueSeats4Component]
    });
    fixture = TestBed.createComponent(VenueSeats4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
