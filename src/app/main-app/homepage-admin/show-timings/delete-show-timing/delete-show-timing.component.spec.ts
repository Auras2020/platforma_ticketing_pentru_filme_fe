import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteShowTimingComponent } from './delete-show-timing.component';

describe('DeleteShowTimingComponent', () => {
  let component: DeleteShowTimingComponent;
  let fixture: ComponentFixture<DeleteShowTimingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteShowTimingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteShowTimingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
