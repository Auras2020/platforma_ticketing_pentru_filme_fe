import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTimings1Component } from './show-timings1.component';

describe('ShowTimings1Component', () => {
  let component: ShowTimings1Component;
  let fixture: ComponentFixture<ShowTimings1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowTimings1Component]
    });
    fixture = TestBed.createComponent(ShowTimings1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
