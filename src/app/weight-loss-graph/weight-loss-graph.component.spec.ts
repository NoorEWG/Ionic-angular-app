import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeightLossGraphComponent } from './weight-loss-graph.component';

describe('WeightLossGraphComponent', () => {
  let component: WeightLossGraphComponent;
  let fixture: ComponentFixture<WeightLossGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeightLossGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeightLossGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
