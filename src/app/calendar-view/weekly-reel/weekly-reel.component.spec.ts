import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyReelComponent } from './weekly-reel.component';

describe('WeeklyReelComponent', () => {
  let component: WeeklyReelComponent;
  let fixture: ComponentFixture<WeeklyReelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WeeklyReelComponent]
    });
    fixture = TestBed.createComponent(WeeklyReelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
