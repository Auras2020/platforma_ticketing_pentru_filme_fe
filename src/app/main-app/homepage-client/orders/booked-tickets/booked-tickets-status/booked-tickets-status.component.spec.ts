import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookedTicketsStatusComponent } from './booked-tickets-status.component';

describe('BookedTicketsStatusComponent', () => {
  let component: BookedTicketsStatusComponent;
  let fixture: ComponentFixture<BookedTicketsStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookedTicketsStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookedTicketsStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
