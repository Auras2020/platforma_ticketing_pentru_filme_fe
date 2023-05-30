import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePeoplePromotionsComponent } from './delete-people-promotions.component';

describe('DeletePeoplePromotionsComponent', () => {
  let component: DeletePeoplePromotionsComponent;
  let fixture: ComponentFixture<DeletePeoplePromotionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeletePeoplePromotionsComponent]
    });
    fixture = TestBed.createComponent(DeletePeoplePromotionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
