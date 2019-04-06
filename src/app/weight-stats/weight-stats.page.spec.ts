import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeightStatsPage } from './weight-stats.page';

describe('WeightStatsPage', () => {
  let component: WeightStatsPage;
  let fixture: ComponentFixture<WeightStatsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeightStatsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeightStatsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
