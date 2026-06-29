import { Component, ElementRef, HostListener, Input, SimpleChanges, ViewChild } from '@angular/core';
import * as echarts from 'echarts';

@Component({
    selector: 'app-stacked-hzl-bar-chart',
    standalone: true,
    imports: [],
    templateUrl: './stacked-hzl-bar.component.html',
    styleUrl: './stacked-hzl-bar.component.css',
})
export class StackedHorizotalBarChartComponent {
    @ViewChild('chartRef', { static: true })
  chartRef!: ElementRef;

  @Input() title = '';

  @Input() categories: string[] = [];

  @Input() seriesData: {
    name: string;
    data: number[];
    color?: string;
  }[] = [];

  chartInstance!: echarts.ECharts;

  ngAfterViewInit(): void {
    this.initChart();
  }

  initChart(): void {
    this.chartInstance = echarts.init(this.chartRef.nativeElement);

    const option: echarts.EChartsOption = {
      title: {
        text: this.title,
        left: 'center'
      },

      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },

      legend: {
        bottom: 0
      },

      // grid: {
      //   left: '3%',
      //   right: '4%',
      //   top: '15%',
      //   bottom: '15%',
      //   containLabel: true
      // },

      grid: { left: '20%', right: '5%', bottom: '20%', top: '10%' },


      xAxis: {
        type: 'value'
      },

      yAxis: {
        type: 'category',
        data: this.categories
      },

      series: this.seriesData.map(item => ({
        name: item.name,
        type: 'bar',
        stack: 'total',

        label: {
          show: true
        },

        emphasis: {
          focus: 'series'
        },

        itemStyle: {
          color: item.color
        },

        data: item.data
      }))
    };

    this.chartInstance.setOption(option);
  }

  @HostListener('window:resize')
  onResize(): void {
    this.chartInstance?.resize();
  }
}

