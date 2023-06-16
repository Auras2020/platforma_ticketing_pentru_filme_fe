import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Movies1Component } from './movies1.component';

describe('Movies1Component', () => {
  let component: Movies1Component;
  let fixture: ComponentFixture<Movies1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Movies1Component]
    });
    fixture = TestBed.createComponent(Movies1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
