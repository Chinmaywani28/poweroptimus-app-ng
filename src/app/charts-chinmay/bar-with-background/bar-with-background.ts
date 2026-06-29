import { Component, ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';
import * as echarts from 'echarts';

@Component({
    selector: 'app-bar-with-background',
    standalone: true,
    imports: [],
    templateUrl: './bar-with-background.html',
    styleUrl: './bar-with-background.css',
})
export class BarWithBackgroundComponent {
  @Input() categories: string[] = [];
  @Input() values: any[] = [];
  // values may contain obj with mul key pair
  @Input() maxValue = 100;

  @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef;
  private chartInstance!: echarts.ECharts;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initChart();
    window.addEventListener('resize', this.resizeChart);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.chartInstance) {
      this.updateChart();
    }
  }

  private initChart(): void {
    this.chartInstance = echarts.init(this.chartContainer.nativeElement);
    this.updateChart();
  }

  private updateChart(): void {
    const option: echarts.EChartsOption = {
      grid: { left: '10%', right: '5%', bottom: '20%', top: '10%' },
      xAxis: {
        type: 'category',
        data: this.categories,
        axisTick: { show: false },
        axisLine: { lineStyle: { color: '#ccc' } }
      },
      yAxis: {
        type: 'value',
        max: this.maxValue,
        axisLine: { show: false },
        splitLine: { lineStyle: { color: '#eee' } }
      },
      series: [
        {
          type: 'bar',
          data: this.values,
          barWidth: '30%',
          itemStyle: { color: '#3b82f6' },
          z: 2
        },
        {
          type: 'bar',
          data: new Array(this.values.length).fill(this.maxValue),
          barWidth: '30%',
          itemStyle: {
            color: '#f0f0f0'
          },
          barGap: '-100%',
          z: 1
        }
      ],
      animationDuration: 500
    };

    this.chartInstance.setOption(option);
  }

  private resizeChart = () => {
    if (this.chartInstance) {
      this.chartInstance.resize();
    }
  };

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.resizeChart);
    if (this.chartInstance) {
      this.chartInstance.dispose();
    }
  }
}

