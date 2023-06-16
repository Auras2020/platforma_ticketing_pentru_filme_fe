import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheatreDetails2Component } from './theatre-details2.component';

describe('TheatreDetails2Component', () => {
  let component: TheatreDetails2Component;
  let fixture: ComponentFixture<TheatreDetails2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TheatreDetails2Component]
    });
    fixture = TestBed.createComponent(TheatreDetails2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
