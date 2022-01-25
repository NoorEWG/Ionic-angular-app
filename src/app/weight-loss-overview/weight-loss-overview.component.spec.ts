import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { WeightLossOverviewComponent } from './weight-loss-overview.component';

describe('WeightLossOverviewComponent', () => {
  let component: WeightLossOverviewComponent;
  let fixture: ComponentFixture<WeightLossOverviewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WeightLossOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeightLossOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
