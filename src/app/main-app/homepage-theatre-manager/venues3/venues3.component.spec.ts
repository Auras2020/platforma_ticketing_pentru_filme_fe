import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Venues3Component } from './venues3.component';

describe('Venues3Component', () => {
  let component: Venues3Component;
  let fixture: ComponentFixture<Venues3Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Venues3Component]
    });
    fixture = TestBed.createComponent(Venues3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
