import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditNutritionPage } from './add-edit-nutrition.page';

describe('AddEditNutritionPage', () => {
  let component: AddEditNutritionPage;
  let fixture: ComponentFixture<AddEditNutritionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditNutritionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditNutritionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
