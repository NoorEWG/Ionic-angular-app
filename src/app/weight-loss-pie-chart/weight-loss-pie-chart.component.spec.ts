import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { WeightLossPieChartComponent } from './weight-loss-pie-chart.component';

describe('WeightLossPieChartComponent', () => {
  let component: WeightLossPieChartComponent;
  let fixture: ComponentFixture<WeightLossPieChartComponent>;

  beforeEach(waitForAsync(() => {
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
