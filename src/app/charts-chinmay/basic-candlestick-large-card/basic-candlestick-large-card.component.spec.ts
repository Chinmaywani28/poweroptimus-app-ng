import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicCandleStickLargeCardComponent } from './doughnut-chart-large-card.component';

describe('BasicCandleStickLargeCardComponent', () => {
  let component: BasicCandleStickLargeCardComponent;
  let fixture: ComponentFixture<BasicCandleStickLargeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicCandleStickLargeCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicCandleStickLargeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
