import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueSeatsComponent } from './venue-seats.component';

describe('VenueSeatsComponent', () => {
  let component: VenueSeatsComponent;
  let fixture: ComponentFixture<VenueSeatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VenueSeatsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VenueSeatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
