import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteReview1Component } from './delete-review1.component';

describe('DeleteReview1Component', () => {
  let component: DeleteReview1Component;
  let fixture: ComponentFixture<DeleteReview1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteReview1Component]
    });
    fixture = TestBed.createComponent(DeleteReview1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
