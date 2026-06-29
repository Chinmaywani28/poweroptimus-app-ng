import { Component, ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';
import * as echarts from 'echarts';

@Component({
    selector: 'app-referer-of-website-pie',
    standalone: true,
    imports: [],
    templateUrl: './referer-of-website-pie.html',
    styleUrl: './referer-of-website-pie.css',
})
export class RefererOfWebsitePieComponent {
  @Input() data: { name: string; value: number }[] = [];
  @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef;

  private chartInstance!: echarts.ECharts;

  ngOnInit(): void {
    this.initChart();
    window.addEventListener('resize', this.resizeChart);
  }

  ngOnChanges(): void {
    if (this.chartInstance) {
      this.setChartOptions();
    }
  }

  ngOnDestroy(): void {
    if (this.chartInstance) {
      this.chartInstance.dispose();
    }
    window.removeEventListener('resize', this.resizeChart);
  }

  private initChart(): void {
    this.chartInstance = echarts.init(this.chartContainer.nativeElement);
    this.setChartOptions();
  }

  private resizeChart = () => {
    if (this.chartInstance) {
      this.chartInstance.resize();
    }
  };

  private setChartOptions(): void {
    this.chartInstance.setOption({
        grid: [{
          left: 0,
          right: 0,
          top: 0,
          bottom: 6
        }],
      tooltip: {
        trigger: 'item'
      },
      legend: {
        show: false,
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'Referrer',
          type: 'pie',
          radius: '60%',
          data: this.data,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    });
  }
}

