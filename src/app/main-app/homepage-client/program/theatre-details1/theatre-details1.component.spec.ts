import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheatreDetails1Component } from './theatre-details1.component';

describe('TheatreDetails1Component', () => {
  let component: TheatreDetails1Component;
  let fixture: ComponentFixture<TheatreDetails1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TheatreDetails1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TheatreDetails1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
