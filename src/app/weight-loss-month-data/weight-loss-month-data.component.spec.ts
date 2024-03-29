import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { WeightLossMonthDataPage } from './weight-loss-month-data.page';

describe('WeightLossMonthDataPage', () => {
  let component: WeightLossMonthDataPage;
  let fixture: ComponentFixture<WeightLossMonthDataPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WeightLossMonthDataPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeightLossMonthDataPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
