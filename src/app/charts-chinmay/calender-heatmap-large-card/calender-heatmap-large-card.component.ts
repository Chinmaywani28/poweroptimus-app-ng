import { Component, ElementRef, EventEmitter, HostListener, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import * as echarts from 'echarts';

@Component({
    selector: 'app-calender-heatmap-large-card',
    standalone: true,
    imports: [],
    templateUrl: './calender-heatmap-large-card.component.html',
    styleUrl: './calender-heatmap-large-card.component.css',
})
export class CalenderHeatmapLargeCardComponent {
  @ViewChild('chartRef') chartRef!: ElementRef;

  @Input() title = 'Calendar Heatmap';

  @Input() year = new Date().getFullYear().toString();

  @Input() chartData: { date: string; value: number }[] = [];

  chartInstance!: echarts.ECharts;

  ngAfterViewInit(): void {
    this.initChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.chartInstance) {
      this.setChartOptions();
    }
  }

  initChart(): void {
    if (!this.chartRef?.nativeElement) return;

    this.chartInstance = echarts.init(this.chartRef.nativeElement);

    this.setChartOptions();
  }

  setChartOptions(): void {
    const values = this.chartData.map(item => item.value);

    const minValue = Math.min(...values, 0);
    const maxValue = Math.max(...values, 100);

    const option: echarts.EChartsOption = {
      title: {
        text: this.title,
        left: 'center'
      },

      tooltip: {
        formatter: (params: any) => {
          return `
            Date : ${params.value[0]} <br/>
            Value : ${params.value[1]}
          `;
        }
      },

      visualMap: {
        min: minValue,
        max: maxValue,
        calculable: true,
        orient: 'horizontal',
        left: 'center',
        bottom: 10,

        inRange: {
          color: [
            '#E8F5E9',
            '#A5D6A7',
            '#66BB6A',
            '#2E7D32'
          ]
        }
      },

      calendar: {
        top: 70,
        left: 20,
        right: 20,

        range: this.year,

        cellSize: ['auto', 18],

        itemStyle: {
          borderWidth: 1,
          borderColor: '#E0E0E0'
        },

        yearLabel: {
          show: false
        }
      },

      series: [
        {
          type: 'heatmap',
          coordinateSystem: 'calendar',

          data: this.chartData.map(item => [
            item.date,
            item.value
          ])
        }
      ]
    };

    this.chartInstance.setOption(option);
  }

  @HostListener('window:resize')
  onResize(): void {
    this.chartInstance?.resize();
  }
}

