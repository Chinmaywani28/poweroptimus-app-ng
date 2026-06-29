import { Component, ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';
import * as echarts from 'echarts';

@Component({
    selector: 'app-stacked-line-chart',
    standalone: true,
    imports: [],
    templateUrl: './stacked-line-chart.html',
    styleUrl: './stacked-line-chart.css',
})
export class StackedLineChartComponent {
  @Input() categories: string[] = [];
  @Input() seriesData: { name: string; data: number[] }[] = [];
  @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef;
  private chartInstance!: echarts.ECharts;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.chartInstance && (changes['categories'] || changes['seriesData'])) {
      this.updateChart();
    }
  }

  ngOnDestroy(): void {
    if (this.chartInstance) {
      this.chartInstance.dispose();
    }
  }

  private initChart(): void {
    this.chartInstance = echarts.init(this.chartContainer.nativeElement);
    this.updateChart();

    window.addEventListener('resize', this.resizeChart);
  }

  private updateChart(): void {
    const option: echarts.EChartsOption = {
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: this.seriesData.map(s => s.name)
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        left: '3%',
        right: '5%',
        bottom: '10%',
        top: '10%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: this.categories
      },
      yAxis: {
        type: 'value'
      },
      series: this.seriesData.map(s => ({
        name: s.name,
        type: 'line',
        stack: 'Total',
        // areaStyle: {}, // keeps area shading
        data: s.data,
        lineStyle: {
           width: 2 // or any line thickness you want
        },
        symbol: 'circle', // optional: hides point markers
        symbolSize: 6, // size of those markers
      }))
    };

    this.chartInstance.setOption(option);
  }

  private resizeChart = () => {
    if (this.chartInstance) {
      this.chartInstance.resize();
    }
  };
}

