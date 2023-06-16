import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageTheatreManagerComponent } from './homepage-theatre-manager.component';

describe('HomepageTheatreManagerComponent', () => {
  let component: HomepageTheatreManagerComponent;
  let fixture: ComponentFixture<HomepageTheatreManagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomepageTheatreManagerComponent]
    });
    fixture = TestBed.createComponent(HomepageTheatreManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
