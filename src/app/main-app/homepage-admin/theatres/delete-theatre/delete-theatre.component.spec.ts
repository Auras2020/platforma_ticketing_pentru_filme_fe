import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTheatreComponent } from './delete-theatre.component';

describe('DeleteTheatreComponent', () => {
  let component: DeleteTheatreComponent;
  let fixture: ComponentFixture<DeleteTheatreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteTheatreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteTheatreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
