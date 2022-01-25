import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { WeightLossGraphComponent } from './weight-loss-graph.component';

describe('WeightLossGraphComponent', () => {
  let component: WeightLossGraphComponent;
  let fixture: ComponentFixture<WeightLossGraphComponent>;

  beforeEach(waitForAsync(() => {
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
