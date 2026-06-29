import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarWithBackgroundComponent } from './set-style-of-single-bar';

describe('BarWithBackgroundComponent', () => {
  let component: BarWithBackgroundComponent;
  let fixture: ComponentFixture<BarWithBackgroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarWithBackgroundComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarWithBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
