import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeightObjectifsPage } from './weight-objectifs.page';

describe('WeightObjectifsPage', () => {
  let component: WeightObjectifsPage;
  let fixture: ComponentFixture<WeightObjectifsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeightObjectifsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeightObjectifsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
