import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemperatureChartWidgetTimeTwoComponent } from './temperature-chart-widget-time.component-two';

describe('TemperatureChartWidgetTimeTwoComponent', () => {
  let component: TemperatureChartWidgetTimeTwoComponent;
  let fixture: ComponentFixture<TemperatureChartWidgetTimeTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemperatureChartWidgetTimeTwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemperatureChartWidgetTimeTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
