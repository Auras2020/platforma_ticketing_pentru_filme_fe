import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueSeats1Component } from './venue-seats1.component';

describe('VenueSeats1Component', () => {
  let component: VenueSeats1Component;
  let fixture: ComponentFixture<VenueSeats1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VenueSeats1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VenueSeats1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
