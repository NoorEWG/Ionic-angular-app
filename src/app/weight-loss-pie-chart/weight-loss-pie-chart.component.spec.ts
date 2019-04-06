import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeightLossPieChartComponent } from './weight-loss-pie-chart.component';

describe('WeightLossPieChartComponent', () => {
  let component: WeightLossPieChartComponent;
  let fixture: ComponentFixture<WeightLossPieChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeightLossPieChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeightLossPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
