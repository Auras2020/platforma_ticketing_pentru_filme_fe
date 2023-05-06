import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddShowTimingComponent } from './add-show-timing.component';

describe('AddShowTimingComponent', () => {
  let component: AddShowTimingComponent;
  let fixture: ComponentFixture<AddShowTimingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddShowTimingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddShowTimingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
