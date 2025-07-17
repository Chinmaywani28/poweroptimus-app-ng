import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemperatureChartWidgetComponent } from './temperature-chart-widget.component';

describe('TemperatureChartWidgetComponent', () => {
  let component: TemperatureChartWidgetComponent;
  let fixture: ComponentFixture<TemperatureChartWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemperatureChartWidgetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemperatureChartWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
