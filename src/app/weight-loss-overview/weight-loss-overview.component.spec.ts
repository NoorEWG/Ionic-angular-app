import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeightLossOverviewComponent } from './weight-loss-overview.component';

describe('WeightLossOverviewComponent', () => {
  let component: WeightLossOverviewComponent;
  let fixture: ComponentFixture<WeightLossOverviewComponent>;

  beforeEach(async(() => {
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
