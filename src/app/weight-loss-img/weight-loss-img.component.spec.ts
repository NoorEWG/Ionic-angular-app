import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { WeightLossImgComponent } from './weight-loss-img.component';

describe('WeightLossImgComponent', () => {
  let component: WeightLossImgComponent;
  let fixture: ComponentFixture<WeightLossImgComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WeightLossImgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeightLossImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
