import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemperatureChartWidgetTimeComponent } from './temperature-chart-widget-time.component';

describe('TemperatureChartWidgetTimeComponent', () => {
  let component: TemperatureChartWidgetTimeComponent;
  let fixture: ComponentFixture<TemperatureChartWidgetTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemperatureChartWidgetTimeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemperatureChartWidgetTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
