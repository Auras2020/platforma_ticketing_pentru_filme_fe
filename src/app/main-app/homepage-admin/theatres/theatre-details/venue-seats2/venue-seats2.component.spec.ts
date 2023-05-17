import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueSeats2Component } from './venue-seats2.component';

describe('VenueSeats2Component', () => {
  let component: VenueSeats2Component;
  let fixture: ComponentFixture<VenueSeats2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VenueSeats2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VenueSeats2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
