import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeightLossModalComponent } from './weight-loss-modal.component';

describe('WeightLossModalComponent', () => {
  let component: WeightLossModalComponent;
  let fixture: ComponentFixture<WeightLossModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeightLossModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeightLossModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
