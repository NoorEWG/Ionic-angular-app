import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';
import { WeightLossGaugeComponent } from './weight-loss-gauge.component';

describe('WeightLossGaugeComponent', () => {
  let component: WeightLossGaugeComponent;
  let fixture: ComponentFixture<WeightLossGaugeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WeightLossGaugeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeightLossGaugeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
