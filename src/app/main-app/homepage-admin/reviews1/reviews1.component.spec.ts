import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Reviews1Component } from './reviews1.component';

describe('Reviews1Component', () => {
  let component: Reviews1Component;
  let fixture: ComponentFixture<Reviews1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Reviews1Component]
    });
    fixture = TestBed.createComponent(Reviews1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
