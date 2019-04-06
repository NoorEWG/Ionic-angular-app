import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeightAddPage } from './weight-add.page';

describe('WeightAddPage', () => {
  let component: WeightAddPage;
  let fixture: ComponentFixture<WeightAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeightAddPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeightAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
