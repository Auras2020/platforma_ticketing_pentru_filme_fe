import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDetails1Component } from './movie-details1.component';

describe('MovieDetails1Component', () => {
  let component: MovieDetails1Component;
  let fixture: ComponentFixture<MovieDetails1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieDetails1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieDetails1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
