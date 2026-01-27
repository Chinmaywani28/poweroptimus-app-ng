import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import * as echarts from 'echarts';

@Component({
    standalone: true,
    selector: 'app-live-temp-chart-time-two',
    imports: [],
    templateUrl: './temperature-chart-widget-time.component-two.html',
    styleUrl: './temperature-chart-widget-time.component-two.css',
})
export class TemperatureChartWidgetTimeTwoComponent {
    @ViewChild('chartContainer', { static: true })
  chartContainer!: ElementRef<HTMLDivElement>;

  @Input() data: { time: number; value: number }[] = [];

  private chart!: echarts.ECharts;

  ngOnInit(): void {
    this.chart = echarts.init(this.chartContainer.nativeElement);
    this.renderChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.chart) {
      this.renderChart();
    }
  }

  ngOnDestroy(): void {
    this.chart.dispose();
  }

  // 🔥 CORE METHOD
  private renderChart(): void {
    const seriesData = this.data.map(d => [
      d.time * 1000, // ✅ seconds → milliseconds
      d.value,
    ]);

    const option: echarts.EChartsOption = {
      tooltip: {
        trigger: 'axis',
        formatter: (params: any) => {
          const p = params[0];
          const date = new Date(p.data[0]);
          return `${date.toLocaleTimeString()}<br/>Value: ${p.data[1]}`;
        },
      },
      grid: {
        left: 40,
        right: 20,
        bottom: 30,
        top: 20,
        containLabel: true,
      },
      xAxis: {
        type: 'time',
      },
      yAxis: {
        type: 'value',
        splitLine: { show: false },
      },
      series: [
        {
          type: 'line',
          data: seriesData,
          smooth: true,
          showSymbol: false,
          symbol: 'none',
          lineStyle: {
            width: 2,
          },
        },
      ],
      animation: false,
    };

    // 🔥 FULL REPLACE – NO MERGE ISSUES
    this.chart.setOption(option, true);
  }
}
