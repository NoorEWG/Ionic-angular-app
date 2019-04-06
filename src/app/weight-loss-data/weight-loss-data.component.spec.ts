import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeightLossDataComponent } from './weight-loss-data.component';

describe('WeightLossDataComponent', () => {
  let component: WeightLossDataComponent;
  let fixture: ComponentFixture<WeightLossDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeightLossDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeightLossDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
