import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeightUpdatePage } from './weight-update.page';

describe('WeightUpdatePage', () => {
  let component: WeightUpdatePage;
  let fixture: ComponentFixture<WeightUpdatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeightUpdatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeightUpdatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
