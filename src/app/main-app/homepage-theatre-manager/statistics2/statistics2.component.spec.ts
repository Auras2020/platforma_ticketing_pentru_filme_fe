import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Statistics2Component } from './statistics2.component';

describe('Statistics2Component', () => {
  let component: Statistics2Component;
  let fixture: ComponentFixture<Statistics2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Statistics2Component]
    });
    fixture = TestBed.createComponent(Statistics2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
