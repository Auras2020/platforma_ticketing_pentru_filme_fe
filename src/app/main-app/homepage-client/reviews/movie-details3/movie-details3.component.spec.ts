import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDetails3Component } from './movie-details3.component';

describe('MovieDetails3Component', () => {
  let component: MovieDetails3Component;
  let fixture: ComponentFixture<MovieDetails3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieDetails3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieDetails3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
