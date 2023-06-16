import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDetails4Component } from './movie-details4.component';

describe('MovieDetails4Component', () => {
  let component: MovieDetails4Component;
  let fixture: ComponentFixture<MovieDetails4Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovieDetails4Component]
    });
    fixture = TestBed.createComponent(MovieDetails4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
