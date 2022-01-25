import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { WeightObjectifUpdatePage } from './weight-objectif-update.page';

describe('WeightObjectifUpdatePage', () => {
  let component: WeightObjectifUpdatePage;
  let fixture: ComponentFixture<WeightObjectifUpdatePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WeightObjectifUpdatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeightObjectifUpdatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
