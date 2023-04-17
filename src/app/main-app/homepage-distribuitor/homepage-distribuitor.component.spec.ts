import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageDistribuitorComponent } from './homepage-distribuitor.component';

describe('HomepageDistribuitorComponent', () => {
  let component: HomepageDistribuitorComponent;
  let fixture: ComponentFixture<HomepageDistribuitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomepageDistribuitorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomepageDistribuitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
