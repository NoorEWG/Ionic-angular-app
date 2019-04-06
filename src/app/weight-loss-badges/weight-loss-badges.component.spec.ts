import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeightLossBadgesComponent } from './weight-loss-badges.component';

describe('WeightLossBadgesComponent', () => {
  let component: WeightLossBadgesComponent;
  let fixture: ComponentFixture<WeightLossBadgesComponent>;

  beforeEach(async(() => {
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
