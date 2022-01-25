import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { WeightLossBadgesComponent } from './weight-loss-badges.component';

describe('WeightLossBadgesComponent', () => {
  let component: WeightLossBadgesComponent;
  let fixture: ComponentFixture<WeightLossBadgesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WeightLossBadgesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeightLossBadgesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
