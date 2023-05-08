import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDetails2Component } from './movie-details2.component';

describe('MovieDetails2Component', () => {
  let component: MovieDetails2Component;
  let fixture: ComponentFixture<MovieDetails2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieDetails2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieDetails2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
