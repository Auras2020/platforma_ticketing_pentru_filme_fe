import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsStatusComponent } from './tickets-status.component';

describe('TicketsStatusComponent', () => {
  let component: TicketsStatusComponent;
  let fixture: ComponentFixture<TicketsStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketsStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketsStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
