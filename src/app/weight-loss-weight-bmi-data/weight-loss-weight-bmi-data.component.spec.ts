import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeightLossWeightBmiDataPage } from './weight-loss-weight-bmi-data.page';

describe('WeightLossWeightBmiDataPage', () => {
  let component: WeightLossWeightBmiDataPage;
  let fixture: ComponentFixture<WeightLossWeightBmiDataPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeightLossWeightBmiDataPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeightLossWeightBmiDataPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
