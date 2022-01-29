import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { WeightLossDataComponent } from './weight-loss-data.component';

describe('WeightLossDataComponent', () => {
  let component: WeightLossDataComponent;
  let fixture: ComponentFixture<WeightLossDataComponent>;

  beforeEach(waitForAsync(() => {
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
function waitForAsync(arg0: () => void): (done: DoneFn) => Promise<void> {
  throw new Error('Function not implemented.');
}

function waitForAsync(arg0: () => void): (done: DoneFn) => Promise<void> {
  throw new Error('Function not implemented.');
}

