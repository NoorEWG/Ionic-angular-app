import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { WeightStatsComponent } from './weight-stats.component';

describe('WeighStatsComponent', () => {
  let component: WeightStatsComponent;
  let fixture: ComponentFixture<WeightStatsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WeightStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeightStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
