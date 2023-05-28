import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPeoplePromotionsComponent } from './add-people-promotions.component';

describe('AddPeoplePromotionsComponent', () => {
  let component: AddPeoplePromotionsComponent;
  let fixture: ComponentFixture<AddPeoplePromotionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPeoplePromotionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPeoplePromotionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
