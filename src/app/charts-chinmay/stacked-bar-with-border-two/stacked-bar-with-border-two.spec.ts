import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StackedBarWithBorderTwoComponent } from './stacked-bar-with-border-two';

describe('StackedBarWithBorderTwoComponent', () => {
  let component: StackedBarWithBorderTwoComponent;
  let fixture: ComponentFixture<StackedBarWithBorderTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StackedBarWithBorderTwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StackedBarWithBorderTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
